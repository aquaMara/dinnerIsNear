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
import { getAuth } from 'firebase/auth';
import app from '../../firebase-config';

const { height } = Dimensions.get('screen');

export default function SignUpConfirmationScreen({ route, navigation }) {

  const auth = getAuth(app);
  const verificationId = route.params.verificationId;
  const phoneNumber = route.params.phoneNumber;
  console.log('verId ', verificationId);
  const [code, setCode] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  /*
  firebase.auth().onAuthStateChanged((user) => {
    //navigation.navigate('LittleMore', {uid: auth.currentUser.uid})
    if (user != null && code != null) {
      console.log('UID ', auth.currentUser.uid)
      const userCheck = firebase.firestore().collection('users').doc(auth.currentUser.uid)
      userCheck.get().then((userInfo) => {
        if (userInfo.exists) {
          console.log('EXISTS')
        } else {
          console.log('EMPTY')
          const idd = auth.currentUser.uid;
          navigation.navigate('LittleMore', {uid: idd})
        }
      }).catch(err => console.log('problem in adressing users collection', err))
    } else {
      setIsLoggedIn(false);
      console.log(false)
    }
  })
  */
  
 
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
  //return () => unsubscribe();
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
    console.log('code', code);
    setCode(code);
    const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
    );
    firebase.auth().signInWithCredential(credential)
    .then(() => {
      //setCode('');
      const usid = firebase.auth().currentUser.uid;
      console.log('IDIDIDIDIDIID ', usid);
      const userCheck = firebase.firestore().collection('users').doc(usid)
      if (usid != null && code != null) {
        userCheck.get().then((userInfo) => {
          if (userInfo.exists) {
            console.log('EXISTS')
            console.log('HELLO')
            // todo : navigate to some other page
            navigation.navigate('Tab');
          } else {
            console.log('EMPTY')
            navigation.navigate('LittleMore', {uid: usid, phoneNumber: phoneNumber})
          }
        }).catch(err => console.log('problem in adressing users collection', err))
      } else {
        setIsLoggedIn(false);
        console.log(false)
      }
    })
    .catch((error) => {
        console.log("ERROR ", error);
    });
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
        <Text style={styles.condition}>Введите код, который мы вам отправили, чтобы пройти регистрацию</Text>        
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
    marginTop: hp(19.79),
    marginBottom: hp(7.1),
    lineHeight: hp(4.74),
  },
  title: {
    fontSize: RFValue(34, height),
    fontFamily: 'SF-Pro-Bold',
    textAlign: 'center',
    color: '#000',
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
    color: '#6D6D72',
  },
  buttonUp: {
    marginTop: hp(4.07),
    //marginTop: hp(10.07),
  },
  buttonRegular: {
    marginTop: hp(40.4),
  },
  buttonText: {
    color: '#fff',
    fontSize: RFValue(17, height),
    lineHeight: hp(2.4),
    fontFamily: 'SF-Pro-Medium',
    textAlign: 'center',
  }
})

/*
const userCheck = firebase.firestore().collection('users').doc(auth.currentUser.uid)
      userCheck.get()
      .then((userInfo) => {
        if (userInfo.exists) {
          console.log('EXISTS')
        } else {
          console.log('EMPTY')
          firebase.firestore().collection('users').add({
            _id: auth.currentUser.uid,
            name: 'Maverick' 
          })
        }
      })
      .catch(err => console.log('problem in adressing users collection', err))
*/