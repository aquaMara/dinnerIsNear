import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from './firebase-config';
import MainNavigation from './navigation/MainNavigation';
import { AuthProvider } from './auth/AuthProvoder';
import { ShoppingCartProvider } from './auth/ShoppingCartProvider';

export default function App() {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <MainNavigation />
      </ShoppingCartProvider>
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
