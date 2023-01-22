import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../styles/colors';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import ArticlesScreen from '../../screens/profile/ArticlesScreen';
import ArticleScreen from '../../screens/profile/ArticleScreen';


const Stack = createNativeStackNavigator();

export default function ProfileNavigation() {

  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName='Profile'>
      <Stack.Screen name="Profile" component={ProfileScreen}
        options={{ headerShown: true, headerBackTitle: 'Назад', headerTitle: 'Профиль',
        headerRight: () => 
        ( <TouchableOpacity >
            <Image source={require('../../assets/images/logoutButton.png')}
              style={{height: hp(2.84), width: wp(6.15)}}/>
          </TouchableOpacity> ) 
        }}/>
      <Stack.Screen name="Articles" component={ArticlesScreen}
        options={{ headerShown: true, headerBackTitle: 'Назад', headerTitle: 'Статьи'}}/>
      <Stack.Screen name="Article" component={ArticleScreen}
        options={({ route }) => ({ title: route.params.title, headerShown: true, headerBackTitle: 'Назад',})} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  
})
