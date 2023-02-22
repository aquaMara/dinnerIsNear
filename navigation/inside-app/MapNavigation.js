import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModalTest from '../../screens/map/ModalTest'
import MapF from '../../screens/map/MapF';
import MapMainScreen from '../../screens/map/MapMainScreen';

const Stack = createNativeStackNavigator();

export default function MapNavigation() {
  return (
    <Stack.Navigator initialRouteName='MapMain'>
      <Stack.Screen name="MapMain" component={MapMainScreen} options={{
        headerShown: true, headerBackTitleVisible: true, headerBackTitle: 'Назад',
        title: 'Рестораны поблизости', headerBackButtonMenuEnabled: true }} />
    </Stack.Navigator>
  )
}