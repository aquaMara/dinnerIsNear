import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
//import { initializeApp } from 'firebase/app'
//import { firebaseConfig } from './firebase-config'
import { app } from './firebase-config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function RegisterScreen() {

    // const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, 'aquamarina.na@gmail.com', 'aquaM63')
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch(error => {
            Alert.alert(error.message)
        })
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, 'aquamarina.na@gmail.com', 'aquaM63')
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch(error => {
            console.log(error);
        })
    }


  return (
    <View>
      <Text>RegisterScreen</Text>
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text>sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignIn}>
        <Text>sign in</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})