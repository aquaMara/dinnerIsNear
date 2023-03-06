import { Alert } from 'react-native'
import React from 'react';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstMapScreen from '../../screens/map/FirstMapScreen';

const Stack = createNativeStackNavigator();

export default function MapNavigation() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="FirstMap" component={FirstMapScreen} options={{
        headerShown: true, headerBackTitleVisible: true, headerBackTitle: 'Назад',
        title: 'Рестораны поблизости', headerBackButtonMenuEnabled: true }} />
    </Stack.Navigator>
  )
}