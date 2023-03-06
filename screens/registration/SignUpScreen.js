import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Keyboard } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Linking } from 'react-native';
import { firebaseConfig } from '../../firebase-config';
import { globalStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

const { height } = Dimensions.get('screen');

export default function SignUpScreen({ navigation }) {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+7');
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
    'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
  });
  
  const sendVerification = () => {
    Alert.alert(
      'Код подтверждения',
      'Ваш код 123456',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('ConfirmSignUp', {phoneNumber: phoneNumber}),
          style: 'default',
        },
      ],
    );
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
    height: hp(4.43),
    borderBottomWidth: wp(0.26),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeInput: {
    width: wp(5.37),
    height: hp(3.43),
    //marginLeft: wp(5.13),
    marginLeft: wp(25),
    lineHeight: hp(2.4),
    fontSize: RFValue(18, height),
    fontFamily: 'SF-Pro-Medium',

  },
  phoneInput: {
    width: wp(65.9),
    height: hp(3.43),
    lineHeight: hp(2.4),
    fontSize: RFValue(18, height),
    fontFamily: 'SF-Pro-Medium',
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