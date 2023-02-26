import { ImageBackground, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import { FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('screen');

export default function Dishes({ arrayOfFavourites }) {

    const [dishes, setDishes] = useState([]);

    const renderItem = ({ item }) => (
        <View style={styles.block}>
            <ImageBackground source={{uri: item.dishPath}} 
                    style={styles.image} imageStyle={{borderRadius: hp(2.37)}} resizeMode='cover' >
                    <LinearGradient 
                        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']}
                        locations={[0.3677, 1]}
                        style={styles.image}></LinearGradient>
                </ImageBackground>
                <View style={styles.imagesContainer}>
                    {item.tags.indexOf("vegetarianism") > -1 && <Image source={require('../../../assets/images/vegetarianismTag.png')} style={[styles.tagImage, {marginLeft: -wp(1.79)}]} />}
                    {item.tags.indexOf("veganism") > -1 && <Image source={require('../../../assets/images/veganismTag.png')} style={[styles.tagImage, {marginLeft: -wp(1.79)}]} />}
                    {item.tags.indexOf("meat") > -1 && <Image source={require('../../../assets/images/meatTag.png')} style={[styles.tagImage, {marginLeft: -wp(1.79)}]} />}
                    {item.tags.indexOf("fish") > -1 && <Image source={require('../../../assets/images/fishTag.png')} style={[styles.tagImage, {marginLeft: -wp(1.79)}]} />}
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
        setDishes(arrayOfFavourites);
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
        height: hp(5.92),
        marginBottom: hp(0),
        marginTop: hp(8),
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pfcBlock: {
        width: wp(43.59),
        height: hp(3),
        marginTop: hp(1.18),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imagesContainer: {
        height: hp(5),
        width: wp(38.46),
        alignItems: 'center',
        //marginHorizontal: wp(2.82),
        alignSelf: 'center',
        marginTop: hp(-19.1),
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