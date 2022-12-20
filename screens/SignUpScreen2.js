import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState, useRef } from 'react'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { app } from '../firebase-config';
import { firebaseConfig } from '../firebase-config';
// import firebase from 'firebase/compat/app';
// import * as firebase from "firebase";
import firebase from "firebase/compat";

export default function SignUpScreen() {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setVerificationId);
        setPhoneNumber('');
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
    <View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text>HHH</Text>
      <TextInput
        placeholder='phone with number code'
        onChangeText={setPhoneNumber}
        keyboardType='phone-pad'
        />
        <TouchableOpacity onPress={sendVerification}>
            <Text>send verrr</Text>
        </TouchableOpacity>
        <TextInput
            placeholder='confirm'
            onChangeText={setCode}
            keyboardType='number-pad'
        />
        <TouchableOpacity onPress={confirmCode}>
            <Text>confirm</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

})