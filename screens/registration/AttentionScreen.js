import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
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

export default function AttentionScreen({ route, navigation }) {

  const userId = route.params.userId;
  
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
      <Image style={styles.warningImage} source={require('../../assets/images/warning.png')} resizeMode='cover' />
      <View style={styles.titleBox}>
        <Text style={styles.title}>Внимание</Text>
      </View>
      <View style={styles.conditionBox}>
        <Text style={styles.bodyText}>Без регистрации мы не сможем подобрать вам правильные параметры</Text>        
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('LittleMore', {userId: userId})}
        style={[globalStyles.mainButton, styles.buttonRegular ]}>
        <Text style={styles.buttonText}>Зарегистрироваться</Text>
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
    marginTop: hp(4.15),
    marginBottom: hp(3.08),
    lineHeight: hp(4.74),
  },
  title: {
    fontSize: RFValue(34, height),
    fontFamily: 'SF-Pro-Bold',
    textAlign: 'center',
  },
  warningImage: {
    height: hp(9.48),
    width: hp(9.48),
    marginTop: hp(25.12),
  },
  conditionBox:{
    width: wp(68.72),
    height: hp(7.93),
    marginTop: hp(1.06),
  },
  bodyText: {
    color: colors.white,
    fontSize: RFValue(15, height),
    lineHeight: hp(2.12),
    fontFamily: 'SF-Pro-Regular',
    textAlign: 'center',
  },
  buttonRegular: {
    marginTop: hp(25.37),
  },
  buttonText: {
    color: '#fff',
    fontSize: RFValue(17, height),
    lineHeight: hp(2.4),
    fontFamily: 'SF-Pro-Medium',
    textAlign: 'center',
  }
})