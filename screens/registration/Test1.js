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
import { app } from '../../firebase-config'

const { height } = Dimensions.get('screen');

export default function SignUpScreen({ navigation }) {

  const auth = getAuth(app);
  const [phoneNumber, setPhoneNumber] = useState('');
  const countryCode = '+7';
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [isVerifying, setIsVerifying] = useState(true);

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
    'SF-Pro-Regular': require('../../assets/fonts/SF-Pro-Regular.otf'),
    //'SF-Pro-Bold': require('../assets/fonts/SF-Pro-Bold.otf'),
    'SF-Pro-Bold': require('../../assets/fonts/FontsFree-Net-SFProDisplay-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const requestVerification = () => {
    if (phoneNumber.length >= 12) {

    }
  }

  const sendVerification = () => {
    var applicationVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container');
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
        .verifyPhoneNumber(phoneNumber, applicationVerifier)
        .then(res => {setVerificationId(res)})
        //.then(setVerificationId)
        //.then(console.log('From verifyPhoneNumber verificationId ', verificationId))
        //.then(res => {navigation.navigate('ConfirmSignUp', {verificationId: 'res'})});  // , {verificationId: verificationId}
    //setPhoneNumber('');
    //navigation.navigate('ConfirmSignUp', {verificationId: verificationId});
  };

  const confirmCode = () => {
      const credential = firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          code
      );
      firebase.auth().signInWithCredential(credential)
      .then(() => {
          setCode('');
      })
      .catch((error) => {
          console.log("ERROR ", error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Введите номер телефона</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ConfirmSignUp')} >
        <Text>TESDG</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.phoneInput}
        placeholder='phone with number code'
        onChangeText={pn => setPhoneNumber(pn)}
        keyboardType='phone-pad'
        />
      <View style={styles.conditionBox}>
        <Text style={styles.condition}>
          Нажимая кнопку «Войти» вы принимаете <Text 
          onPress={() => Linking.openURL('https://yandex.ru/legal/market_transp/')} style={{textDecorationLine: 'underline'}}>
            Соглашение об условиях доставки
          </Text> и Политику обработки персональных данных</Text>        
      </View>
      <TouchableOpacity onPress={sendVerification}
        style={[globalStyles.mainButton, isKeyboardShown ? styles.buttonUp : styles.buttonRegular ]}>
        <Text style={colors.white}>Войти</Text>
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
    marginTop: hp(19.79),
    marginBottom: hp(7.1),
    lineHeight: hp(4.74),
  },
  title: {
    fontSize: RFValue(34, height),
    fontFamily: 'SF-Pro-Bold',
    textAlign: 'center',
  },
  phoneInput: {
    width: wp(76.9),
    height: hp(3.43),
    lineHeight: hp(2.4),
    fontSize: RFValue(17, height),
    fontFamily: 'SF-Pro-Regular',
    borderBottomColor: '#000000',
    borderBottomWidth: wp(0.26),
    //paddingBottom: wp(1.8),
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
  },
  buttonUp: {
    marginTop: hp(4.07),
    //marginTop: hp(10.07),
  },
  buttonRegular: {
    marginTop: hp(40.4),
  }
})