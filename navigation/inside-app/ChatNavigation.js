import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../../screens/chat/ChatScreen';

const Stack = createNativeStackNavigator();

export default function ChatNavigation() {
  return (
    <Stack.Navigator initialRouteName='Chat'>
      <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: true, headerBackTitleVisible: true, headerBackTitle: 'Назад', title: 'Чат', headerBackButtonMenuEnabled: true }} />
    </Stack.Navigator>
  )
}