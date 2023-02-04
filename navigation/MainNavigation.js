import React from 'react';
import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import SignUpScreen from '../screens/registration/SignUpScreen';
import SignUpConfirmationScreen from '../screens/registration/SignUpConfirmationScreen';
import LittleMoreScreen from '../screens/registration/LittleMoreScreen';
import ProfileStepOne from '../screens/registration/ProfileStepOne';
import ProfileStepTwo from '../screens/registration/ProfileStepTwo';

import TabNavigation from './TabNavigation';
import CalorieCountScreen from '../screens/registration/CalorieCountScreen';
import { MapScreen } from '../screens/main/MapScreen';

const { height } = Dimensions.get('screen');

const Stack = createNativeStackNavigator();

export default function MainNavigation() {

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../assets/fonts/SFPro700.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }
/*
<Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmSignUp" component={SignUpConfirmationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LittleMore" component={LittleMoreScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StepOne" component={ProfileStepOne} 
            options={{
            title: 'Настройка профиля', 
            headerStyle: { backgroundColor: '#fff' }, headerTintColor: '#000', headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: RFValue(17, height), lineHeight: hp(2.4), fontFamily: 'SF-Pro-Medium', },
            headerBackTitle: 'Назад',
        }} />
        <Stack.Screen name="StepTwo" component={ProfileStepTwo}
            options={{ 
            title: 'Настройка профиля', 
            headerStyle: { backgroundColor: '#fff' }, headerTintColor: '#000', headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: RFValue(17, height), lineHeight: hp(2.4), fontFamily: 'SF-Pro-Medium', },
            headerBackTitle: 'Назад',
        }} />
        <Stack.Screen name="CalorieCount" component={CalorieCountScreen} options={{ headerShown: false }} />
        */
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignUp'>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmSignUp" component={SignUpConfirmationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LittleMore" component={LittleMoreScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StepOne" component={ProfileStepOne} 
            options={{
            title: 'Настройка профиля', 
            headerStyle: { backgroundColor: '#fff' }, headerTintColor: '#000', headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: RFValue(17, height), lineHeight: hp(2.4), fontFamily: 'SF-Pro-Medium', },
            headerBackTitle: 'Назад',
        }} />
        <Stack.Screen name="StepTwo" component={ProfileStepTwo}
            options={{ 
            title: 'Настройка профиля', 
            headerStyle: { backgroundColor: '#fff' }, headerTintColor: '#000', headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: RFValue(17, height), lineHeight: hp(2.4), fontFamily: 'SF-Pro-Medium', },
            headerBackTitle: 'Назад',
        }} />
        <Stack.Screen name="CalorieCount" component={CalorieCountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tab" component={TabNavigation} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
/*
<Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmSignUp" component={SignUpConfirmationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LittleMore" component={LittleMoreScreen} options={{ headerShown: false }} />
          <Stack.Screen name="StepOne" component={ProfileStepOne} 
            options={{
            title: 'Настройка профиля', 
            headerStyle: { backgroundColor: '#fff' }, headerTintColor: '#000', headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: RFValue(17, height), lineHeight: hp(2.4), fontFamily: 'SF-Pro-Medium', },
            headerBackTitle: 'Назад',
          }} />
          <Stack.Screen name="StepTwo" component={ProfileStepTwo}
            options={{ 
            title: 'Настройка профиля', 
            headerStyle: { backgroundColor: '#fff' }, headerTintColor: '#000', headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: RFValue(17, height), lineHeight: hp(2.4), fontFamily: 'SF-Pro-Medium', },
            headerBackTitle: 'Назад',
          }} />
        <Stack.Screen name="CalorieCount" component={CalorieCountScreen} options={{ headerShown: false }} />

*/
/*
<Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmSignUp" component={SignUpConfirmationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LittleMore" component={LittleMoreScreen} options={{ headerShown: false }} />
          <Stack.Screen name="StepOne" component={ProfileStepOne} 
            options={{
            title: 'Настройка профиля', 
            headerStyle: { backgroundColor: '#fff' }, headerTintColor: '#000', headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: RFValue(17, height), lineHeight: hp(2.4), fontFamily: 'SF-Pro-Medium', },
            headerBackTitle: 'Назад',
          }} />
          <Stack.Screen name="StepTwo" component={ProfileStepTwo}
            options={{ 
            title: 'Настройка профиля', 
            headerStyle: { backgroundColor: '#fff' }, headerTintColor: '#000', headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: RFValue(17, height), lineHeight: hp(2.4), fontFamily: 'SF-Pro-Medium', },
            headerBackTitle: 'Назад',
          }} />
        <Stack.Screen name="CalorieCount" component={CalorieCountScreen} options={{ headerShown: false }} /> 
        */

/*
<Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmSignUp" component={SignUpConfirmationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LittleMore" component={LittleMoreScreen} options={{ headerShown: false }} />
          <Stack.Screen name="StepOne" component={ProfileStepOne} 
            options={{
            title: 'Настройка профиля', 
            headerStyle: { backgroundColor: '#fff' }, headerTintColor: '#000', headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: RFValue(17, height), lineHeight: hp(2.4), fontFamily: 'SF-Pro-Medium', },
            headerBackTitle: 'Назад',
          }} />
          <Stack.Screen name="StepTwo" component={ProfileStepTwo}
            options={{ 
            title: 'Настройка профиля', 
            headerStyle: { backgroundColor: '#fff' }, headerTintColor: '#000', headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: RFValue(17, height), lineHeight: hp(2.4), fontFamily: 'SF-Pro-Medium', },
            headerBackTitle: 'Назад',
          }} />
        <Stack.Screen name="CalorieCount" component={CalorieCountScreen} options={{ headerShown: false }} />
        */
/*
<Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmSignUp" component={SignUpConfirmationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LittleMore" component={LittleMoreScreen} options={{ headerShown: false }} />
          <Stack.Screen name="StepOne" component={ProfileStepOne} 
            options={{ 
            title: 'Настройка профиля', 
            headerStyle: { backgroundColor: '#fff' }, headerTintColor: '#000', headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: RFValue(17, height), lineHeight: hp(2.4), fontFamily: 'SF-Pro-Medium', },
            headerBackTitle: 'Назад',
          }} />
          <Stack.Screen name="StepTwo" component={ProfileStepTwo}
            options={{ 
            title: 'Настройка профиля', 
            headerStyle: { backgroundColor: '#fff' }, headerTintColor: '#000', headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: RFValue(17, height), lineHeight: hp(2.4), fontFamily: 'SF-Pro-Medium', },
            headerBackTitle: 'Назад',
          }} />



/*
<Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmSignUp" component={SignUpConfirmationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Attention" component={AttentionScreen} options={{ headerShown: false }} />
*/

/*
headerLeft: () => (
  <Button title="Update count" onPress={()=>console.log("hi")}/>
),
*/

/*
headerBackTitle: "Back",
headerBackTitleStyle: {
    color: 'pink'
},
*/

/*
<Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmSignUp" component={SignUpConfirmationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Attention" component={AttentionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LittleMore" component={LittleMoreScreen} options={{ headerShown: false }} />
*/