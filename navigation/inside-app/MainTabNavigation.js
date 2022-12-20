import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecommendationScreen from '../../screens/main/RecommendationScreen';
import MenuScreen from '../../screens/main/MenuScreen';

const Stack = createNativeStackNavigator();

export default function MainTabNavigation() {
  return (
    <Stack.Navigator initialRouteName='Recommendation'>
      <Stack.Screen name="Recommendation" component={RecommendationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: true, title: 'Заказ блюд', headerBackTitle: 'Назад' }} />
    </Stack.Navigator>
  )
}
// <Stack.Screen name="Recommendation" component={RecommendationScreen} options={{ headerShown: false }} />