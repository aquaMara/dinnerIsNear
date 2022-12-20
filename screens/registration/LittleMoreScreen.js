import { Dimensions, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Keyboard } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Linking } from 'react-native';
import { firebaseConfig } from '../../firebase-config';
import firebase from "firebase/compat";
import { globalStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height } = Dimensions.get('screen');

export default function LittleMoreScreen({ route, navigation }) {

  const userIdentif = route.params.uid;
  //const userId = 'fghjk';
  
  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Ещё немного!</Text>
      </View>
      <View style={styles.conditionBox}>
        <Text style={styles.bodyText}>Нобходимо ввести некоторые данные о тебе и выбрать параметры сортировки блюд,
         чтобы мы смогли представить тебе сбалансированные блюда.</Text>        
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('StepOne', {userId: userIdentif})}
        style={[globalStyles.mainButton, styles.buttonRegular]}>
        <Text style={styles.buttonText}>Настроить профиль</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  titleBox: {
    width: wp(66.67),
    marginTop: hp(38.74),
    marginBottom: hp(3.08),
    lineHeight: hp(4.74),
  },
  title: {
    fontSize: RFValue(34, height),
    fontFamily: 'SF-Pro-Bold',
    textAlign: 'center',
  },
  conditionBox:{
    width: wp(70.7),
    height: hp(10.53),
    marginTop: hp(1.06),
  },
  bodyText: {
    fontSize: RFValue(15, height),
    lineHeight: hp(2.12),
    fontFamily: 'SF-Pro-Regular',
    textAlign: 'center',
  },
  buttonRegular: {
    marginTop: hp(25.1),
  },
  buttonText: {
    color: '#fff',
    fontSize: RFValue(17, height),
    lineHeight: hp(2.4),
    fontFamily: 'SF-Pro-Medium',
    textAlign: 'center',
  }
})