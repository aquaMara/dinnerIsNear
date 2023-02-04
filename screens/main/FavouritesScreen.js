import { ScrollView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../styles/colors';
import { countMeals } from '../../functions/CountMeals';
import { FlatList } from 'react-native';
import data from '../chat/data';
import { globalStyles } from '../../styles/styles';
import Dishes from './components/Dishes';

const { height } = Dimensions.get('screen');

export default function FavouritesScreen() {

    const [meals, setMeals] = useState();
    const [dishes, setDishes] = useState([{}]);
    let numberOfMeals = 4;
    let calorieIntake = 1700;

    const changeBlockVisibility = (givenId) => {
        console.log(givenId)
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

    const renderItem = ({ item }) => (
        <View style={styles.block}>
            <View style={{  }}>
                <Image source={require('../../assets/images/dish.png')} style={styles.image} resizeMode='cover' />
            </View>
            <View style={[styles.dishName]}>
                <View style={{width: wp(23.08), height: hp(6)}}>
                    <Text style={styles.dishText} numberOfLines={2} ellipsizeMode='tail'>{item.dishName}</Text>
                </View>
                <View style={{width: wp(12)}}>
                    <Text style={[styles.dishText, {textAlign: 'center'}]}>{item.dishCalories}</Text>
                    <Text style={[styles.dishText, {textAlign: 'center'}]}>ккал</Text>
                </View>
            </View>
            <View style={styles.pfcBlock}>
                <View><Text style={styles.regularText}>{item.dishProtein} Б</Text></View>
                <View style={{marginHorizontal: wp(2.56)}}><Text style={styles.regularText}>{item.dishFats} Ж</Text></View>
                <View><Text style={styles.regularText}>{item.dishCarbohydrates} У</Text></View>
            </View>
        </View>
    );

    const render1 = ({ item }) => (
        
        <View style={!item.visible && styles.mealInvisible} >
            {console.log('MEL', item)}
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
            <Dishes />
        </View>)}
    </View>
    )

    useEffect(() => {
        setMeals(countMeals(numberOfMeals, calorieIntake));
        setDishes(data);
        console.log('hjhjhjh', meals)
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
            renderItem={render1} keyExtractor={meal => meal.id} />
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
        shadowColor: 'rgba(0, 0, 0, 0.18)',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowRadius: hp(2.13),
        shadowOpacity: 1,
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

    

})