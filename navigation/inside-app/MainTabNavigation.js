import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecommendationScreen from '../../screens/main/RecommendationScreen';
import MenuScreen from '../../screens/main/MenuScreen';
import { MapScreen } from '../../screens/main/MapScreen';
import ScreenChoice from '../../screens/main/ScreenChoice';
import ShoppingCartScreen from '../../screens/main/ShoppingCartScreen';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import SwitchSelector from "react-native-switch-selector";

const { height } = Dimensions.get('screen');

const Stack = createNativeStackNavigator();
// , headerRight: () => (<View><Text>hh</Text></View>)
export default function MainTabNavigation() {

  const navigation = useNavigation();
  const [address, setAddress] = useState('проспект Толстова, 237');
    const [isHomeScreen, setIsHomeScreen] = useState(true);
  const setScreen = (val) => {
    console.log('hhhhhh', val);
    setIsHomeScreen(val)
    val ? navigation.navigate('Map') : navigation.navigate('Choice')
}

  return (
    <Stack.Navigator initialRouteName='Choice'>
      <Stack.Screen name="Choice" component={ScreenChoice} options={{ headerShown: true, headerBackTitle: 'Выбор',
        headerLeft: () => {
          <View>
            <SwitchSelector
            style={{marginLeft: 14, height: hp(3.67), width: wp(15.08), padding: 0}}
            imageStyle={{height: hp(3.2), width: wp(6.92)}}
            onPress={val => setScreen(val)}
            initial={1}
                selectedColor={colors.green}
                textColor={isHomeScreen ? colors.green : 'rgba(120, 120, 128, 0)'}
                buttonColor={colors.white}
                borderColor={colors.green}
                backgroundColor={isHomeScreen ? colors.green : 'rgba(120, 120, 128, 0.16)'}
                options={[
                    { value: false, imageIcon: require('../../assets/images/restaurant.png'), activeColor: 'white' }, //images.feminino = require('./path_to/assets/img/feminino.png')
                    { value: true, imageIcon: require('../../assets/images/map.png'), activeColor: 'white' } //images.masculino = require('./path_to/assets/img/masculino.png')
                ]} />
          </View>
        },
        headerRight: () => {
          <View><Text>ghg</Text></View>
        } }} />
      <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Menu" component={MenuScreen} options={({ route }) => ({ title: route.params.title, headerBackTitle: 'Назад', headerShown: true, 
        headerRight: () => 
        ( <View style={styles.buttonsBox}>
            <TouchableOpacity>
              <Image source={require('../../assets/images/favourites.png')}
                style={{height: hp(3.55), width: wp(7.69)}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} >
              <Image source={require('../../assets/images/shop.png')}
                style={{height: hp(3.55), width: wp(7.69), marginLeft: wp(3.33)}} />
            </TouchableOpacity>
          </View> ) })} />
      <Stack.Screen name="Cart" component={ShoppingCartScreen} options={{ headerShown: true, headerBackTitle: 'Назад', headerTitle: 'Корзина' }} />
    </Stack.Navigator>
  )
}
// options={{ headerShown: true, title: 'Заказ блюд', headerBackTitle: 'Назад' }}
// <Stack.Screen name="Recommendation" component={RecommendationScreen} options={{ headerShown: false }} />

const styles = StyleSheet.create({
  buttonsBox: {
      width: wp(19),
      height: hp(3.55),
      marginRight: wp(4.1),
      display: 'flex',
      flexDirection: 'row',
      marginLeft: 'auto',
      alignSelf: 'center'
  },
})