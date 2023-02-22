import { Dimensions, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Keyboard } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Linking } from 'react-native';
import firebase from "firebase/compat";
import { globalStyles } from '../../../styles/styles';
import { colors } from '../../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height } = Dimensions.get('screen');

export default function PasswordScreen({ route }) {
  const collection = route.params.tableName;
  const data = route.params.data;

  const [propassword, setPropassword] = useState(null);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const sendToFirebase = () => {
    const userId = "8D5itKpIaMZubdZLPsyP0XCDY6i1";
    firebase.firestore().collection(collection).doc(userId)
      .update(data)
      .catch(err => console.log(err));
    
  }
 
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
    'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Введите пароль</Text>
      </View>
      <View style={styles.bodyBox}>
        <Text style={styles.bodyText}>Настройка PRO доступна только после приобретения консультации со специалистом.</Text>
      </View>
      <TextInput style={styles.inputBox}
        value={propassword} onChangeText={p => setPropassword(p)} 
        editable={true} keyboardType='number-pad' />
      <View style={styles.conditionBox}>
        <Text style={styles.conditionText}>Введите код, который вам сообщил специалист для сохранения настроек.</Text>        
      </View>
      <TouchableOpacity style={[globalStyles.mainButton, isKeyboardShown ? styles.buttonUp : styles.buttonRegular ]}>
        <Text style={[styles.buttonText, styles.whiteButtonText]}>Войти</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.whiteButton}>
        <Text style={[styles.buttonText, styles.blackButtonText]}>Заказать консультацию</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white
  },
  titleBox: {
    width: wp(66.67),
    marginTop: hp(10.31),
    marginBottom: hp(1.07),
  },
  title: {
    fontSize: RFValue(34, height),
    fontFamily: 'SF-Pro-Bold',
    textAlign: 'center',
    color: colors.black,
    lineHeight: hp(4.81),
  },
  bodyBox: {
    width: wp(66.67),
    marginBottom: hp(6.67),
  },
  bodyText: {
    fontSize: RFValue(15, height),
    fontFamily: 'SF-Pro-Regular',
    textAlign: 'center',
    color: colors.black,
    lineHeight: hp(2.12),
  },
  conditionBox: {
    width: wp(60.51),
    marginTop: hp(1.07),
  },
  conditionText: {
    fontSize: RFValue(13, height),
    fontFamily: 'SF-Pro-Regular',
    textAlign: 'center',
    color: colors.grey,
    lineHeight: hp(1.84),
  },
  inputBox: {
    width: wp(76.92),
    height: hp(3.43),
    borderBottomWidth: wp(0.26),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center'
  },
  buttonUp: {
    marginTop: hp(9.24),
    marginBottom: hp(1.54)
  },
  buttonRegular: {
    marginTop: hp(31.4),
    marginBottom: hp(1.54),
  },
  buttonText: {
    fontSize: RFValue(17, height),
    lineHeight: hp(2.4),
    fontFamily: 'SF-Pro-Medium',
    textAlign: 'center',
  },
  whiteButtonText: {
    color: colors.white,
  },
  blackButtonText: {
    color: colors.black,
  }
})