import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../styles/colors';
import { countMeals } from '../../functions/CountMeals';
import { FlatList } from 'react-native';
import Dishes from './components/Dishes';
import { useAuth } from '../../auth/AuthProvoder';
import * as SecureStore from 'expo-secure-store';

const { height } = Dimensions.get('screen');

export default function FavouritesScreen({route}) {

    const [meals, setMeals] = useState();
    const { mealsCount, calories }= useAuth();
    const [arrayOfFavs, setArrayOfFavs] = useState([]);

    const changeBlockVisibility = async (givenId) => {
        let zx = await setFavourites(givenId);
        setArrayOfFavs(zx);
        const changedMeals = meals.map(meal => {
            if (meal.id === givenId) {
            return {
                ...meal,
                visible: !meal.visible, 
            }
            } else {
                return meal;
            }
        })
        setMeals(changedMeals);
    }

    const setFavourites = async (givenId) => {
        let arrayOfFavs = JSON.parse(await SecureStore.getItemAsync('arrayOfFavourites'));
        let arrayOfFavourites = [];
        for (let i = 0; i < arrayOfFavs.length; i++) {
            if (arrayOfFavs[i].mealId == givenId) {
                arrayOfFavourites.push(arrayOfFavs[i]);
            }
        }
        setArrayOfFavs(arrayOfFavourites);
        return arrayOfFavourites;
    }

    const renderBlock = ({ item }) => (
        <View style={!item.visible && styles.mealInvisible}>
        <View style={styles.topLine}>
            <Text style={[ item.visible ? styles.titleTextVisible : styles.titleText ]}>{item.name}</Text>
            <TouchableOpacity onPress={() => changeBlockVisibility(item.id)} style={[styles.arrowButton, !item.visible && styles.arrowButtonInvisible]}>
                {item.visible ? (<Image source={require('../../assets/images/chevronUp.png')}
                    style={{width: wp(5.13), height: hp(1.38), alignSelf: 'flex-end'}} />)
                : (<Image source={require('../../assets/images/leftChevron.png')}
                    style={{width: wp(5.13), height: hp(1.38)}} />)}
            </TouchableOpacity>
        </View>
        {item.visible && (
        <View style={styles.favsBlock}>
            <Dishes arrayOfFavourites={arrayOfFavs} />
        </View>)}
    </View>
    )

    useEffect(() => {
        setMeals(countMeals(6, calories));
    }, []);

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
    });

    if (!fontsLoaded) {
        return null;
    }

  return (
    <FlatList numColumns={1} data={meals} style={{backgroundColor: colors.white, flex: 1}}
            renderItem={renderBlock} keyExtractor={meal => meal.id} />
  )
}

const styles = StyleSheet.create({
    mealInvisible: {
        height: hp(9.01),
        width: wp(91.8),
        marginTop: hp(2.37),
        backgroundColor: colors.white,
        borderRadius: hp(1.54),
        alignSelf: 'center',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowColor: colors.black,
        shadowRadius: wp(2.05),
        shadowOpacity: 0.15,
    },
    topLine: {
        width: wp(91.8),
        marginTop: hp(2.78),
        height: hp(4.86),
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    titleText: {
        fontSize: RFValue(17, height),
        fontFamily: 'SF-Pro-Regular',
        lineHeight: hp(2.4),
        marginLeft: wp(5.13),
        marginTop: 5,
    },
    titleTextVisible: {
        fontSize: RFValue(33, height),
        fontFamily: 'SF-Pro-Bold',
        lineHeight: hp(4.81),
    },
    arrowButton: {
        marginRight: 0,
        marginLeft: 'auto',
        alignSelf: 'center',
        justifyContent: 'center',
        height: hp(2.98),
        width: wp(7),
    },
    arrowButtonInvisible: {
        marginRight: wp(4.1),
        marginTop: 0,
        marginBottom: 'auto'
    },
    image: {
        width: wp(12.82),
        height: hp(5.92),
        borderRadius: wp(3.33),
        aspectRatio: 1
    },
    favsBlock: {
        //width: wp(91.8),
        width: wp(100),
        marginTop: hp(2.49),
        alignSelf: 'center',
    },
    tagsContainer: {
        height: hp(5),
        width: wp(23.2),
        //justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    tagImage: {
        width: wp(6.92),
        height: hp(2.84),
        aspectRatio: 1,
        borderColor: 'red',
    },

    

})