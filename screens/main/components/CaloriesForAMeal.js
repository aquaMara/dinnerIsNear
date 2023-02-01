import { Dimensions, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';
import { colors } from '../../../styles/colors';
import { globalStyles } from '../../../styles/styles';
import { useAuth } from '../../../auth/AuthProvoder';
import { countCalories } from '../../../functions/CountCalories';
import firebase from 'firebase/compat';
import { collection, getDoc, getFirestore, getDocs, collectionGroup, query, where, doc, documentId } from "@firebase/firestore";
import { countMeals } from '../../../functions/CountMeals';
import { setStatusBarHidden } from 'expo-status-bar';

const { height } = Dimensions.get('screen');

export default function CaloriesForAMeal({ mealId }) {

  const { currentUserMeals, setCurrentUserMeals} = useAuth();
  const { caloriesCount, setCaloriesCount } = useAuth();
  const { proteinCount, setProteinCount } = useAuth();
  const { fatsCount, setFatsCount } = useAuth();
  const { carbohydratesCount, setCarbohydratesCount } = useAuth();

  const filterFunctionForTotalCaloriesCount = (mId) => {
    var caloriesForThisMealFromGlobal = caloriesCount.filter(obj => {
        return obj.mealId === mId
    })
    let totalCalories = 0;
    caloriesForThisMealFromGlobal.forEach(element => {
        totalCalories += element.totalCalories;
    });
    return totalCalories;
  }
  const filterFunctionForTotalProteinCount = (mId) => {
      var proteinForThisMealFromGlobal = proteinCount.filter(obj => {
          return obj.mealId === mId
      });
      let totalProtein = 0;
      proteinForThisMealFromGlobal.forEach(element => {
          totalProtein += element.totalProtein;
      });
      return totalProtein;
  }
  const filterFunctionForTotalFatsCount = (mId) => {
      var fatsForThisMealFromGlobal = fatsCount.filter(obj => {
          return obj.mealId === mId
      });
      let  totalFats = 0;
      fatsForThisMealFromGlobal.forEach(element => {
          totalFats += element.totalFats;
      });
      return totalFats;
  }
  const filterFunctionForTotalCarbohydratesCount = (mId) => {
      var carbohydratesForThisMealFromGlobal = carbohydratesCount.filter(obj => {
          return obj.mealId === mId
      });
      let totalCarbohydrates = 0;
      carbohydratesForThisMealFromGlobal.forEach(element => {
          totalCarbohydrates += element.totalCarbohydrates;
      });
      return totalCarbohydrates;
  }

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
          <Text style={styles.todaysText}>{filterFunctionForTotalProteinCount(mealId)} Б</Text>
        </View>
        <View style={styles.todaysBlock}>
          <Text style={styles.todaysText}>{filterFunctionForTotalFatsCount(mealId)} Ж</Text>
        </View>
        <View style={[styles.todaysBlock, {marginRight: 0, marginLeft: wp(7.3)}]}>
          <Text style={styles.todaysText}>{filterFunctionForTotalCarbohydratesCount(mealId)} У</Text>
        </View>
        <View style={styles.todaysCaloriesBlock}>
          <Text style={styles.todaysCaloriesText}>{filterFunctionForTotalCaloriesCount(mealId)} ккал</Text>
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