import { Dimensions, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';
import { colors } from '../../../styles/colors';
import { globalStyles } from '../../../styles/styles';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dishesIntroduction from '../../../data/dishesIntroduction';
import * as SecureStore from 'expo-secure-store';

const { height } = Dimensions.get('screen');

export default function OrderPart({meal}) {

    const navigation = useNavigation();
    const [dishesIntro, setDishesIntro] = useState([]);

    const moveToDishes = async (section) => {
      let trueTags = await getTags();
      let trueProTags = await getProTags();
      let weekTags = await getWeekTags();
      navigation.navigate("RecommendationMenu",
        {title: 'Меню', section: section, mealId: meal.id, trueTags: trueTags, trueProTags: trueProTags, weekTags: weekTags});
    }
  
    const getTags = async () => {
      let trueTagsData = await SecureStore.getItemAsync('trueTags');
      let trueTags = JSON.parse(trueTagsData)
      return trueTags;
    }
  
    const getProTags = async () => {
      let trueTagsData = await SecureStore.getItemAsync('trueProTags');
      let trueProTags = JSON.parse(trueTagsData);
      return trueProTags;
    }
  
    const getWeekTags = async () => {
      let weekTagsData = await SecureStore.getItemAsync('weekTags');
      let weekTags = JSON.parse(weekTagsData);
      return weekTags;
    }

    useEffect(() => {
        setDishesIntro(dishesIntroduction);
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
    <View style={styles.orderBlock}>
        <View>
            <Text style={styles.orderText}>Закажите <Text style={[styles.orderText, {textTransform: 'lowercase'}]}>
            {meal.name}</Text> или отдельный продукт</Text>
        </View>
        <TouchableOpacity style={[globalStyles.mainButton, styles.button]} onPress={() => moveToDishes('Все')}>
            <Text style={styles.buttonText}>Заказать продукты</Text>
        </TouchableOpacity>
        <View style={styles.dishesLine}>
            {dishesIntro.length > 0 && (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            { dishesIntroduction.length > 0 && dishesIntroduction.map((dish) =>
                <TouchableOpacity key={dish.id} style={{height: hp(8.5), width: wp(15.4), marginRight: wp(2.31)
                }} 
                    onPress={() => moveToDishes(dish.name)}>
                  <View style={{alignItems: 'center', marginVertical: 0}}>
                      <Image source={dish.image} style={styles.dishImage} resizeMode='cover' />
                  </View>
                  <View style={{height: hp(1.9), marginBottom: 0, marginTop: 'auto'}}>
                      <Text style={styles.dishText}>{dish.name}</Text>
                  </View>
                </TouchableOpacity>
            )}
            </ScrollView>
          )}
        </View>
    </View>
  )
}
// onPress={() => navigation.navigate('Menu', {sectionId: dish.id, title: dish.name})}>
const styles = StyleSheet.create({
    orderBlock: {
        height: hp(22.99),
        width: wp(95.9),
        marginTop: hp(2.37),
        alignSelf: 'flex-end',
    },
    orderText: {
        color: colors.grey,
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        fontFamily: 'SF-Pro-Regular',
    },
    button: {
        backgroundColor: colors.white,
        marginTop: hp(1.07),
        alignSelf: 'flex-start',
        shadowColor: 'rgba(0, 0, 0, 0.18)',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowRadius: hp(2.13),
        shadowOpacity: 1,
    },
    buttonText: {
        color: colors.green,
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        fontFamily: 'SF-Pro-Bold',
    },
    dishesLine: {
        height: hp(9.36),
        height: hp(10.4),
        width: wp(95.9),
        marginTop: hp(2.37),
    },
    dishText: {
        color: colors.black,
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        fontFamily: 'SF-Pro-Regular',
        textAlign: 'center',
    },
    dishImage: {
        width: wp(15.4),
        height: hp(7.1),
        //height: wp(14),
        //width: wp(14),
        aspectRatio: 1,
        borderRadius: hp(1.54),
    }
})