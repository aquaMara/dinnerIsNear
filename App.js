import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from './firebase-config';
import MainNavigation from './navigation/MainNavigation';
import { AuthProvider } from './auth/AuthProvoder';
import YaMap from 'react-native-yamap';
YaMap.init('10bf2982-fdc2-4b2c-91b0-30348cfca6c3');

export default function App() {
  //YaMap.init('API_KEY');
  return (
    <AuthProvider>
        <MainNavigation />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
