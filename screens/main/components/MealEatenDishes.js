import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions, Image, ScrollView } from 'react-native'
import React from 'react';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { FlatList } from 'react-native';
import { colors } from '../../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

import dishesList from '../../../data/dishesList';

const { height } = Dimensions.get('screen');

export default function MealEatenDishes() {

    const [dishes, setDishes] = useState([
        {
            "id": "38",
            "dishName": "Чикен Каннам Кунг",
            "restaurantName": "Menza ",
            "section": "Япония",
            "tags": "chicken,rice,cereals,gluten,boiled",
            "dishCalories": 270,
            "dishProtein": 14,
            "dishFats": 10,
            "dishCarbohydrates": 32,
            "dishPath": "https://eda.yandex.ru/images/3568095/effa9fef052160c52e82f91de2d9085f-216x188.jpeg",
            "dishPrice": 455,
            "description": "Куриное филе в панировке в соусе каннам кунг на рисовой подушке. Слабоострая.",
            "weight": "350 г"
          },
          {
            "id": "39",
            "dishName": "Баттер Чикен",
            "restaurantName": "Menza ",
            "section": "Япония",
            "tags": "chicken,rice,boiled",
            "dishCalories": 186,
            "dishProtein": 7,
            "dishFats": 8,
            "dishCarbohydrates": 22,
            "dishPath": "https://eda.yandex.ru/images/2806911/9845f8cb5900d68b515e340a03d3bad5-216x188.jpeg",
            "dishPrice": 495,
            "description": "Курица в индийском стиле и рис в соусе баттер масала.",
            "weight": "359 г"
          },
    ]);
    
    useEffect(() => {
        //setDishes(dishesList);
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
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {dishes.length > 0 && dishes.map((item) => 
        <View style={{height: hp(25)}}>
            <View style={styles.topBlock}>
                <ImageBackground source={{uri: item.dishPath}} 
                    style={styles.dishImage} imageStyle={{borderRadius: hp(2.37)}} resizeMode='cover' >
                    <LinearGradient 
                        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']}
                        locations={[0.3677, 1]}
                        style={styles.dishImage}></LinearGradient>
                </ImageBackground>
                <View style={styles.imagesContainer}>
                    <TouchableOpacity style={styles.heartImageButton} onPress={() => addToFavs(item.id, item)}>
                        <Image source={require('../../../assets/images/heart.png')} style={styles.heartImage} />
                    </TouchableOpacity>
                    <View style={styles.tagsContainer}>
                        {item.tags.indexOf("vegetarianism") > -1 && <Image source={require('../../../assets/images/vegetarianismTag.png')} style={[styles.tagImage, {marginLeft: -wp(1.79)}]} />}
                        {item.tags.indexOf("veganism") > -1 && <Image source={require('../../../assets/images/veganismTag.png')} style={[styles.tagImage, {marginLeft: -wp(1.79)}]} />}
                        {item.tags.indexOf("meat") > -1 && <Image source={require('../../../assets/images/meatTag.png')} style={[styles.tagImage, {marginLeft: -wp(1.79)}]} />}
                        {item.tags.indexOf("fish") > -1 && <Image source={require('../../../assets/images/fishTag.png')} style={[styles.tagImage, {marginLeft: -wp(1.79)}]} />}
                    </View>
                </View>
                <View style={styles.middleBlock}>
                    <View style={{width: wp(23.08), height: hp(5.92)}}>
                        <Text style={styles.dishText} numberOfLines={2} ellipsizeMode='tail'>{item.dishName}</Text>
                    </View>
                    <View style={{width: wp(12)}}>
                        <Text style={[styles.dishText, {textAlign: 'center'}]}>{item.dishCalories}</Text>
                        <Text style={[styles.dishText, {textAlign: 'center'}]}>ккал</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomBlock}>
                <View><Text style={styles.regularText}>{item.dishProtein} Б</Text></View>
                <View style={{marginHorizontal: wp(2.56)}}><Text style={styles.regularText}>{item.dishFats} Ж</Text></View>
                <View><Text style={styles.regularText}>{item.dishCarbohydrates} У</Text></View>
            </View>
        </View>
        )}

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    topBlock: {
        height: hp(20.14),
        width: wp(43.59),
    },
    dishImage: {
        width: wp(43.59),
        height: hp(20.14),
        borderRadius: hp(2.37),
    },
    imagesContainer: {
        height: hp(5),
        width: wp(38.46),
        alignSelf: 'center',
        //marginHorizontal: wp(2.82),
        marginTop: hp(-19.1),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    heartImageButton: {
        height: hp(5),
        width: wp(10),
        justifyContent: 'center',
    },
    heartImage: {
        height: hp(1.66),
        width: wp(4.1),
        width: wp(6.92),
        height: hp(2.84),
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
    middleBlock: {
        width: wp(37.44),
        height: hp(5.92),
        marginBottom: hp(0),
        marginTop: hp(8),
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomBlock: {
        width: wp(43.59),
        height: hp(3),
        marginTop: hp(1.18),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dishText: {
        color: colors.white,
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        fontFamily: 'SF-Pro-Medium',
    },
    regularText: {
        color: colors.black,
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        fontFamily: 'SF-Pro-Regular',
    },

})