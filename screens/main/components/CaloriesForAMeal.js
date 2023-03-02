import { Dimensions, View, Text, StyleSheet, Image, } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';
import { colors } from '../../../styles/colors';
import { useAuth } from '../../../auth/AuthProvoder';
import * as SecureStore from 'expo-secure-store';

const { height } = Dimensions.get('screen');

export default function CaloriesForAMeal({ mealId }) {

  const [todayMealCalories, setTodayMealCalories] = useState(0);
  const [todayMealProtein, setTodayMealProtein] = useState(0);
  const [todayMealFats, setTodayMealFats] = useState(0);
  const [todayMealCarbohydrates, setTodayMealCarbohydrates] = useState(0);

  const FormatDate = (date) => {
    var mm = date.getMonth() + 1;
    return date.getFullYear() + '-' + mm + '-' + date.getDate();
  }

  const getTodayMealStatistics = async () => {
    const today = FormatDate(new Date())
    const data = await SecureStore.getItemAsync(today);
    const eatenToday = JSON.parse(data);
    if (eatenToday) {
      countNutrition(eatenToday, mealId);
    }
  }

  const countNutrition = (eatenToday, mealId) => {
    let tcl = 0, tp = 0, tf = 0, tc = 0;
    for (let i = 0; i < eatenToday.length; i++) {
      if (eatenToday[i].mealId == mealId) {
        tcl += eatenToday[i].totalCalories;
      }
    }
    setTodayMealCalories(tcl);
    for (let i = 0; i < eatenToday.length; i++) {
      if (eatenToday[i].mealId == mealId) {
        tp += eatenToday[i].totalProtein;
      }
    }
    setTodayMealProtein(tp);
    for (let i = 0; i < eatenToday.length; i++) {
      if (eatenToday[i].mealId == mealId) {
        tf += eatenToday[i].totalFats;
      }
    }
    setTodayMealFats(tf);
    for (let i = 0; i < eatenToday.length; i++) {
      if (eatenToday[i].mealId == mealId) {
        tc += eatenToday[i].totalCarbohydrates;
      }
    }
    setTodayMealCarbohydrates(tc);
  }

  useEffect(() => {
    getTodayMealStatistics();
  })

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
  });

  if (!fontsLoaded) {
      return null;
  }

  return (
    <View style={{width: wp(91.8), height: hp(3.67), marginTop: hp(2.31)}}>
      <View style={styles.caloriesLine}>
        <View style={[styles.todaysBlock, {marginLeft: 0, marginRight: wp(7.3)}]}>
          <Text style={styles.todaysText}>{todayMealProtein} Б</Text>
        </View>
        <View style={styles.todaysBlock}>
          <Text style={styles.todaysText}>{todayMealFats} Ж</Text>
        </View>
        <View style={[styles.todaysBlock, {marginRight: 0, marginLeft: wp(7.3)}]}>
          <Text style={styles.todaysText}>{todayMealCarbohydrates} У</Text>
        </View>
        <View style={styles.todaysCaloriesBlock}>
          <Text style={styles.todaysCaloriesText}>{todayMealCalories} ккал</Text>
        </View>
      </View>
      <Image source={require('../../../assets/images/longLine.png')} style={{width: wp(91.8), height: hp(0.47), marginTop: hp(0.6)}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  caloriesLine: {
    display: 'flex',
    flexDirection: 'row',
    width: wp(91.8),
    height: hp(2.6),
  },
  todaysBlock: {
    height: hp(2.61),
    width: wp(13.85),
  },

  todaysText: {
    color: colors.black,
    fontSize: RFValue(18, height),
    lineHeight: hp(2.58),
    width: wp(13.85),
    textAlign: 'left',
    fontFamily: 'SF-Pro-Regular',
  },
  todaysCaloriesBlock: {
    height: hp(2.61),
    width: wp(23.85),
    marginRight: 0,
    marginLeft: 'auto',
  },
  todaysCaloriesText: {
    color: colors.black,
    fontSize: RFValue(18, height),
    lineHeight: hp(2.58),
    textAlign: 'right',
    fontFamily: 'SF-Pro-Bold',
  },
})