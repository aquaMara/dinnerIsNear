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
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPhoneNumber } from 'firebase/auth';

const { height } = Dimensions.get('screen');

export default function SignUpScreen({ navigation }) {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+7')
  //const countryCode = '+7';
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
 
  
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
    //'SF-Pro-Regular': require('../../assets/fonts/SF-Pro-Regular.otf'),
    //'SF-Pro-Bold': require('../../assets/fonts/FontsFree-Net-SFProDisplay-Regular.ttf'),
    'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  
const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    console.log(phoneNumber);
    let pn = '+7' + phoneNumber;
    phoneProvider
        .verifyPhoneNumber(pn, recaptchaVerifier.current)
        .then(res => {navigation.navigate('ConfirmSignUp', {verificationId: res, phoneNumber: phoneNumber})})
        .catch(err => console.log('Error sendVerification', err, ' phone ', phoneNumber));
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <FirebaseRecaptchaVerifierModal 
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View style={styles.titleBox}>
        <Text style={styles.title}>Введите номер телефона</Text>
      </View>
      <View style={styles.inputBox}>
        <TextInput value={countryCode} editable={false} 
          style={styles.countryCodeInput}  />
        <TextInput style={styles.phoneInput}
          value={phoneNumber}
          onChangeText={pn => setPhoneNumber(pn)}
          keyboardType='phone-pad'
        />
      </View>
      <View style={styles.conditionBox}>
        <Text style={styles.condition}>
          Нажимая кнопку «Войти» вы принимаете <Text 
          onPress={() => Linking.openURL('https://yandex.ru/legal/market_transp/')} style={{textDecorationLine: 'underline'}}>
            Соглашение об условиях доставки
          </Text> и Политику обработки персональных данных</Text>        
      </View>
      <TouchableOpacity onPress={sendVerification}
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
    marginTop: hp(14.22),
    marginBottom: hp(7.11),
  },
  title: {
    fontSize: RFValue(34, height),
    fontFamily: 'SF-Pro-Bold',
    textAlign: 'center',
    color: colors.black,
    lineHeight: hp(4.81),
  },
  inputBox: {
    width: wp(76.92),
    height: hp(3.43),
    borderBottomWidth: wp(0.26),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeInput: {
    width: wp(5.37),
    height: hp(3.43),
    marginLeft: wp(5.13),
    lineHeight: hp(2.4),
    fontSize: RFValue(17, height),
    fontFamily: 'SF-Pro-Regular',
  },
  phoneInput: {
    width: wp(65.9),
    height: hp(3.43),
    lineHeight: hp(2.4),
    fontSize: RFValue(17, height),
    fontFamily: 'SF-Pro-Regular',
    //alignSelf: 'center',
    //smarginLeft: wp(1),
  },
  conditionBox:{
    width: wp(68.72),
    height: hp(5.69),
    marginTop: hp(1.06),
  },
  condition: {
    fontSize: RFValue(13, height),
    lineHeight: hp(1.84),
    fontFamily: 'SF-Pro-Regular',
    textAlign: 'center',
    color: '#6D6D72',
  },
  buttonUp: {
    marginTop: hp(10.07),
    marginBottom: hp(1.54)
  },
  buttonRegular: {
    marginTop: hp(40.4),
    marginBottom: hp(5.57),
  },
  buttonText: { // 600
    color: '#fff',
    fontSize: RFValue(17, height),
    lineHeight: hp(2.4),
    fontFamily: 'SF-Pro-Medium',
    textAlign: 'center',
  }
})