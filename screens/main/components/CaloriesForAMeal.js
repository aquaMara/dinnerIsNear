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

export default function CaloriesForAMeal(props) {

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
          <Text style={styles.todaysText}>150 Б</Text>
        </View>
        <View style={styles.todaysBlock}>
          <Text style={styles.todaysText}>150 Ж</Text>
        </View>
        <View style={[styles.todaysBlock, {marginRight: 0, marginLeft: wp(7.3)}]}>
          <Text style={styles.todaysText}>150 У</Text>
        </View>
        <View style={styles.todaysCaloriesBlock}>
          <Text style={styles.todaysCaloriesText}>1500 ккал</Text>
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