import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModalTest from '../../screens/map/ModalTest'
import MapF from '../../screens/map/MapF';

const Stack = createNativeStackNavigator();

export default function MapNavigation() {
  return (
    <Stack.Navigator initialRouteName='MapF'>
      <Stack.Screen name="MapF" component={MapF} options={{ headerShown: true, headerBackTitleVisible: true, headerBackTitle: 'Назад', title: 'Чат', headerBackButtonMenuEnabled: true }} />
      <Stack.Screen name="ModalTest" component={ModalTest} options={{ headerShown: true, headerBackTitleVisible: true, headerBackTitle: 'Назад', title: 'Чат', headerBackButtonMenuEnabled: true }} />
    </Stack.Navigator>
  )
}