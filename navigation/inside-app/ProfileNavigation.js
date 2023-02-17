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
import ProfileConfigScreen from '../../screens/profile/ProfileConfigScreen';
import ProConfigFirstScreen from '../../screens/profile/pro/ProConfigFirstScreen';
import UndesirableProductsScreen from '../../screens/profile/pro/UndesirableProductsScreen';
import WeekTagsScreen from '../../screens/profile/pro/WeekTagsScreen';
import ModesScreen from '../../screens/profile/pro/ModesScreen';
import PasswordScreen from '../../screens/profile/pro/PasswordScreen';


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
        options={({ route }) => ({ title: route.params.title, headerShown: true, headerBackTitle: 'Назад'})} />
      <Stack.Screen name="ProfileConfig" component={ProfileConfigScreen}
        options={({ route }) => ({ title: 'Настройка профиля', headerShown: true, headerBackTitle: 'Назад'})} />
      <Stack.Screen name="ProConfig" component={ProConfigFirstScreen}
        options={({ route }) => ({ title: 'Настройка PRO', headerShown: true,
                                  headerBackTitle: 'Назад', headerBackTitleStyle: {color: colors.black}}
                                )} />
      <Stack.Screen name="UndesirableProducts" component={UndesirableProductsScreen}
        options={{ title: 'Настройка PRO', headerShown: true,
                   headerBackTitle: 'Назад', headerBackTitleStyle: {color: colors.black}
                }} />
      <Stack.Screen name="WeekTags" component={WeekTagsScreen}
        options={{ title: 'Настройка PRO', headerShown: true,
                   headerBackTitle: 'Назад', headerBackTitleStyle: {color: colors.black}
                }} />
      <Stack.Screen name="Modes" component={ModesScreen}
        options={{ title: 'Настройка PRO', headerShown: true,
                   headerBackTitle: 'Назад', headerBackTitleStyle: {color: colors.black}
                }} />
      <Stack.Screen name="Password" component={PasswordScreen}
        options={{ title: 'Настройка PRO', headerShown: true,
                   headerBackTitle: 'Назад', headerBackTitleStyle: {color: colors.black}
                }} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  
})
