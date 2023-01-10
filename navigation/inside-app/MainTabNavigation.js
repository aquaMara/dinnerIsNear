import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecommendationScreen from '../../screens/main/RecommendationScreen';
import MenuScreen from '../../screens/main/MenuScreen';
import { MapScreen } from '../../screens/main/MapScreen';
import ScreenChoice from '../../screens/main/ScreenChoice';

const Stack = createNativeStackNavigator();

export default function MainTabNavigation() {
  return (
    <Stack.Navigator initialRouteName='Choice'>
      <Stack.Screen name="Choice" component={ScreenChoice} options={{ headerShown: false }} />
      <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Menu" component={MenuScreen} options={({ route }) => ({ title: route.params.title, headerBackTitle: 'Назад', headerShown: true })} />
    </Stack.Navigator>
  )
}
// options={{ headerShown: true, title: 'Заказ блюд', headerBackTitle: 'Назад' }}
// <Stack.Screen name="Recommendation" component={RecommendationScreen} options={{ headerShown: false }} />