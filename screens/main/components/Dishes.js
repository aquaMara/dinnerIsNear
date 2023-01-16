import { ScrollView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import { FlatList } from 'react-native';
import { globalStyles } from '../../../styles/styles';
import data from '../../chat/data';

const { height } = Dimensions.get('screen');

export default function Dishes() {

    
    const [dishes, setDishes] = useState([{}]);

    const renderItem = ({ item }) => (
        <View style={styles.block}>
            <View style={{  }}>
                <Image source={require('../../../assets/images/dish.png')} style={styles.image} resizeMode='cover' />
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
            <TouchableOpacity style={styles.littleButton}>
                <Text style={styles.buttonText}>{item.dishPrice}р</Text>
        </TouchableOpacity>
        </View>);


    useEffect(() => {
        //console.log('modalVisible ', modalVisible);
        //setModalVisibleIntro(modalVisible);
        console.log('data', data)
        setDishes(data);
    }, []);

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
    });

    if (!fontsLoaded) {
        return null;
    }

  return (
    <FlatList numColumns={2} data={dishes} 
            renderItem={renderItem} keyExtractor={item => item.id} />
  )
}


const styles = StyleSheet.create({
    block: {
        backgroundColor: colors.white,
        height: hp(29.03),
        width: wp(43.59),
        borderRadius: hp(2.37),
        alignItems: 'center',
        marginBottom: hp(2.13),
        shadowColor: 'rgba(0, 0, 0, 0.18)',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowRadius: wp(2.1),
        shadowOpacity: 1,
        marginLeft: wp(4.1),
    },
    littleButton: {
        width: wp(40.51),
        height: hp(3.8),
        backgroundColor: colors.green,
        borderRadius: hp(2.61),
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        fontFamily: 'SF-Pro-Bold',
        textAlign: 'center',
    },
    dishText: {
        color: colors.white,
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        fontFamily: 'SF-Pro-Medium',
    },
    image: {
        width: wp(43.59),
        height: hp(20.14),
        borderRadius: hp(2.37),
        //aspectRatio: 1,
    },
    dishName: {
        width: wp(37.44),
        height: hp(4.74),
        marginTop: -hp(5.92),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    pfcBlock: {
        marginTop: hp(1.19),
        width: wp(37.44),
        height: hp(4.38),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
})