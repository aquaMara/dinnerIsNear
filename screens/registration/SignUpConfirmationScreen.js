import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Keyboard } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { firebaseConfig } from '../../firebase-config';
import firebase from "firebase/compat";
import { globalStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { useAuth } from '../../auth/AuthProvoder';
import * as SecureStore from 'expo-secure-store';

const { height } = Dimensions.get('screen');

export default function SignUpConfirmationScreen({ route, navigation }) {

  const verificationId = route.params.verificationId;
  const phoneNumber = route.params.phoneNumber;
  const [code, setCode] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  
  const { setCalories, setProtein, setFats, setCarbohydrates, setName, setMealsCount } = useAuth();
 
  useEffect(() => {
    const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardShown(true);
    });
    const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardShown(false);
    });

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    }
  }, []);
  
  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const confirmCode = () => {
    setCode(code);
    const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
    );
    firebase.auth().signInWithCredential(credential)
    .then(() => {
      const usid = firebase.auth().currentUser.uid;
      const userCheck = firebase.firestore().collection('users').doc(usid)
      if (usid != null && code != null) {
        userCheck.get().then((userInfo) => {
          if (userInfo.exists) {
            getData();
            navigation.navigate('Tab');
          } else {
            saveData(usid, phoneNumber);
            cleanEatenMealsByDate();
            navigation.navigate('LittleMore')
          }
        }).catch(err => console.log('SignUpConfirmationScreen confirmCode 1', err))
      } else {
        setIsLoggedIn(false);
      }
    })
    .catch((error) => {
        console.log('SignUpConfirmationScreen confirmCode 2', error);
    });
  }

  const saveData = async (userId) => {
    const phoneNumber = '+7' + route.params.phoneNumber;
    await SecureStore.setItemAsync('userId', userId);
    await SecureStore.setItemAsync('phoneNumber', phoneNumber);
  }

  const getData = async () => {
    let dayCalories = parseInt(await SecureStore.getItemAsync('dayCalories'));
    let dayProtein = parseInt(await SecureStore.getItemAsync('dayProtein'));
    let dayFats = parseInt(await SecureStore.getItemAsync('dayFats'));
    let dayCarbohydrates = parseInt(await SecureStore.getItemAsync('dayCarbohydrates'));
    let mealAmount = parseInt(await SecureStore.getItemAsync('mealAmount'));
    let name = await SecureStore.getItemAsync('name');

    setCalories(dayCalories);
    setProtein(dayProtein);
    setFats(dayFats);
    setCarbohydrates(dayCarbohydrates);
    setMealsCount(mealAmount)
    setName(name);
  }

  const cleanEatenMealsByDate = () => {
    const dateToday = new Date();
    var mm = dateToday.getMonth() + 1;
    console.log(dateToday.getFullYear() + '-' + mm + '-' + dateToday.getDate());
  }
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={styles.container}>
      <FirebaseRecaptchaVerifierModal 
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View style={styles.titleBox}>
        <Text style={styles.title}>Введите код</Text>
      </View>
      <TextInput
        style={styles.phoneInput}
        value={code}
        onChangeText={pn => setCode(pn)}
        keyboardType='phone-pad'
        />
      <View style={styles.conditionBox}>
        <Text style={styles.conditionText}>Введите код, который мы вам отправили, чтобы пройти регистрацию</Text>        
      </View>
      <TouchableOpacity onPress={confirmCode}
        style={[globalStyles.mainButton, isKeyboardShown ? styles.buttonUp : styles.buttonRegular ]}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </TouchableWithoutFeedback>
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
    marginTop: hp(19.07),
    marginBottom: hp(7.11),
    lineHeight: hp(4.74),
  },
  title: {
    fontSize: RFValue(34, height),
    fontFamily: 'SF-Pro-Bold',
    textAlign: 'center',
    color: colors.black,
  },
  phoneInput: {
    width: wp(76.9),
    height: hp(3.43),
    lineHeight: hp(2.4),
    fontSize: RFValue(19, height),
    fontFamily: 'SF-Pro-Medium',
    borderBottomColor: colors.black,
    borderBottomWidth: wp(0.26),
    textAlign: 'center'
    //paddingBottom: wp(1.8),
  },
  conditionBox:{
    width: wp(68.72),
    height: hp(5.69),
    marginTop: hp(1.06),
  },
  conditionText: {
    fontSize: RFValue(13, height),
    lineHeight: hp(1.84),
    fontFamily: 'SF-Pro-Regular',
    textAlign: 'center',
    color: colors.grey,
  },
  buttonUp: {
    marginBottom: hp(1.54),
    marginTop: hp(11.97),
  },
  buttonRegular: {
    marginTop: hp(40.4),
    marginBottom: hp(5.57),
  },
  buttonText: {
    color: colors.white,
    fontSize: RFValue(17, height),
    lineHeight: hp(2.4),
    fontFamily: 'SF-Pro-Medium',
    textAlign: 'center',
  }
})