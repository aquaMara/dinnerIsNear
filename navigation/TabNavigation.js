import { View, Text, Image } from 'react-native'
import React from 'react'
import { colors } from '../styles/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainTabNavigation from './inside-app/MainTabNavigation';
import MapNavigation from './inside-app/MapNavigation';
import ChatNavigation from './inside-app/ChatNavigation';
import ProfileNavigation from './inside-app/ProfileNavigation';

const Tab = createBottomTabNavigator();


export default function TabNavigation() {
  return (
    <Tab.Navigator initialRouteName='ProfileTab' 
      screenOptions={{
      tabBarActiveTintColor: colors.black,
      tabBarInactiveTintColor: colors.grey,
      tabBarActiveBackgroundColor: colors.white,
      tabBarInactiveBackgroundColor: colors.white,
    }}>
      <Tab.Screen name="MainTab" component={MainTabNavigation} options={{ 
        headerShown: false,
        tabBarLabel: 'Главная',
        tabBarIcon: ({size,focused,color}) => {
          return (<Image style={{ width: size, height: size }} source={require('../assets/images/mainIcon.png')} />);}
        }} />
      <Tab.Screen name="MapTab" component={MapNavigation} options={{ 
        headerShown: false, tabBarLabel: 'Карта',
        tabBarIcon: ({size,focused,color}) => {
          return (<Image style={{ width: size, height: size }} source={require('../assets/images/mapIcon.png')} />);} 
          }} />
      <Tab.Screen name="ChatTab" component={ChatNavigation} options={{ 
        headerShown: false, tabBarLabel: 'Чат',
        tabBarIcon: ({size,focused,color}) => {
          return (<Image style={{ width: size, height: size }} source={require('../assets/images/chatIcon.png')} />);}
        }} />
      <Tab.Screen name="ProfileTab" component={ProfileNavigation} options={{ 
        headerShown: false, tabBarLabel: 'Профиль',
        tabBarIcon: ({size,focused,color}) => {
        return (<Image style={{ width: size, height: size }} source={require('../assets/images/profileIcon.png')} />);} 
        }} />
    </Tab.Navigator>
  )
}