import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecommendationScreen from '../../screens/main/RecommendationScreen';
import MenuScreen from '../../screens/main/MenuScreen';
import { MapScreen } from '../../screens/main/MapScreen';
import ScreenChoice from '../../screens/main/ScreenChoice';
import ShoppingCartScreen from '../../screens/main/ShoppingCartScreen';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import SwitchSelector from "react-native-switch-selector";
import { Switch } from 'react-native';
import FavouritesScreen from '../../screens/main/FavouritesScreen';

import RestaurantScreen from '../../screens/main/RestaurantScreen';
import Restaurants from '../../screens/main/restaurant-part/Restaurants';
import RestaurantMenuScreen from '../../screens/main/restaurant-part/RestaurantMenuScreen';

import RecommendationMenuScreen from '../../screens/main/home-part/RecommendationMenuScreen';
import DeliveryCartScreen from '../../screens/main/home-part/DeliveryCartScreen';

import { useAuth } from '../../auth/AuthProvoder';

const { height } = Dimensions.get('screen');

const Stack = createNativeStackNavigator();

export default function MainTabNavigation() {

  const navigation = useNavigation();
  //const [address, setAddress] = useState('проспект Толстова, 237');
  const { address, setAddress } = useAuth();

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName='Recommendation'>
      <Stack.Screen name="Recommendation" component={RecommendationScreen} options={{ 
        headerTitleStyle: {hidden: true, fontSize: 0},
        headerBackTitle: 'Назад', headerShown: true,
        headerLeft: () => 
        (<View style={styles.addressInsideBox}>
          <Switch value={true} onValueChange={() => navigation.navigate('Restaurant')}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
            <TouchableOpacity style={styles.writtenAddress} onPress={() => navigation.navigate('MapMe')}>
                <View style={{height: hp(4.27), display: 'flex', flexDirection: 'column'}}>
                <View style={{display: 'flex', flexDirection: 'row',}} >
                    <Text style={styles.title}>Адрес доставки</Text>
                    <Image source={require('../../assets/images/chevronLight.png')}
                        style={{height: hp(1.3), width: wp(1.28), marginLeft: wp(1.03), alignSelf: 'center'}} />
                </View>
                {address == null
                ? (<Text style={styles.value}>Название не определено</Text>)
                : (<Text style={styles.value}>{address.substring(0, 19)}...</Text>)}
                </View>
            </TouchableOpacity>
        </View>),
        headerRight: () => 
        ( <View style={styles.buttonsBox}>
            <TouchableOpacity onPress={() => navigation.navigate('Favs')} style={{marginRight: wp(2)}} >
              <Image source={require('../../assets/images/favourites.png')}
                style={styles.favsImage}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DeliveryCart')} style={{}}>
              <Image source={require('../../assets/images/shop.png')}
                style={styles.shopImage} />
            </TouchableOpacity>
          </View> ),
        }} />
      <Stack.Screen name="Restaurant" component={RestaurantScreen} options={{
        headerBackTitle: 'Назад', headerShown: true,
        headerTitle: 'В ресторане',
        headerLeft: () => 
        (<View style={styles.addressInsideBox}>
          <Switch value={false} onValueChange={() => navigation.navigate('Recommendation')}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>),
        headerRight: () => 
        ( <View style={styles.buttonsBox}>
            <TouchableOpacity onPress={() => navigation.navigate('Favs')}  style={{marginRight: wp(2)}}>
              <Image source={require('../../assets/images/favourites.png')}
                style={styles.favsImage}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} >
              <Image source={require('../../assets/images/shop.png')}
                style={styles.shopImage} />
            </TouchableOpacity>
          </View> ),
        }} />
      <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Menu" component={MenuScreen} options={({ route }) => ({ title: route.params.title, headerBackTitle: 'Назад', headerShown: true, 
        headerRight: () => 
        ( <View style={styles.buttonsBox}>
            <TouchableOpacity onPress={() => navigation.navigate('Favs')} style={{marginRight: wp(2)}}>
              <Image source={require('../../assets/images/favourites.png')}
                style={styles.favsImage}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} >
              <Image source={require('../../assets/images/shop.png')}
                style={styles.shopImage} />
            </TouchableOpacity>
          </View> ) })} />
      <Stack.Screen name="Cart" component={ShoppingCartScreen} options={{ headerShown: true, headerBackTitle: 'Назад', headerTitle: 'Корзина' }} />
      <Stack.Screen name="DeliveryCart" component={DeliveryCartScreen} options={{ headerShown: true, headerBackTitle: 'Назад', headerTitle: 'Корзина' }} />
      <Stack.Screen name="Favs" component={FavouritesScreen} options={{ headerShown: true, headerBackTitle: 'Назад', headerTitle: 'Избранное' }} />
      <Stack.Screen name="RecommendationMenu" component={RecommendationMenuScreen} options={({ route }) => ({ title: route.params.title, headerBackTitle: 'Назад', headerShown: true, 
        headerRight: () => 
        ( <View style={styles.buttonsBox}>
            <TouchableOpacity onPress={() => navigation.navigate('Favs')} style={{marginRight: wp(2)}}>
              <Image source={require('../../assets/images/favourites.png')}
                style={styles.favsImage}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DeliveryCart')} >
              <Image source={require('../../assets/images/shop.png')}
                style={styles.shopImage} />
            </TouchableOpacity>
          </View> ) })} />
      <Stack.Screen name="Restaurants" component={Restaurants} options={{ headerShown: true, headerBackTitle: 'Назад', headerTitle: 'Заведения' }} />
      <Stack.Screen name="RestaurantMenu" component={RestaurantMenuScreen} options={({ route }) => ({ title: "Меню: " + route.params.title, headerBackTitle: 'Назад', headerShown: true, 
        headerRight: () => 
        ( <View style={styles.buttonsBox}>
            <TouchableOpacity onPress={() => navigation.navigate('Favs')} style={{marginRight: wp(2)}}>
              <Image source={require('../../assets/images/favourites.png')}
                style={styles.favsImage}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} >
              <Image source={require('../../assets/images/shop.png')}
                style={styles.shopImage} />
            </TouchableOpacity>
          </View> ) })} />
    </Stack.Navigator>
  )
}
// options={{ headerShown: true, title: 'Заказ блюд', headerBackTitle: 'Назад' }}
// <Stack.Screen name="Recommendation" component={RecommendationScreen} options={{ headerShown: false }} />

const styles = StyleSheet.create({
  addressInsideBox: {
    //marginTop:  hp(1.54),
    height: hp(4.27),
    display: 'flex',
    flexDirection: 'row',
  },
  buttonsBox: {
      width: wp(21),
      height: hp(5.55),
      //marginRight: wp(2.1),
      display: 'flex',
      flexDirection: 'row',
      marginLeft: 'auto',
      alignSelf: 'center'
  },
  favsImage: {
    height: hp(5.55),
    width: wp(8.69)
  },
  shopImage: {
    height: hp(5.55),
    width: wp(8.69),
  },
  writtenAddress: {
    marginLeft: wp(3.33),
  },
  title: {
    fontSize: RFValue(13, height),
    fontFamily: 'SF-Pro-Regular',
    color: colors.black,
    opacity: 0.4,
    lineHeight: hp(1.84),
    textAlign: 'center'
  }, 
  value: {
    fontSize: RFValue(17, height),
    fontFamily: 'SF-Pro-Bold',
    lineHeight: hp(2.4),
    textAlign: 'center',
  },
})

/*

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

        */

        /*
        <Stack.Screen name="Restaurant" component={RestaurantScreen} options={{ 
        headerTitleStyle: {hidden: true, fontSize: 0},
        headerBackTitle: 'Назад', headerShown: true,
        headerLeft: () => 
        (<View style={styles.addressInsideBox}>
          <SwitchSelector
            style={{height: hp(3.67), width: wp(15.08), padding: 0}}
            imageStyle={{height: hp(3.2), width: wp(6.92)}}
            onPress={(val) => {navigation.navigate('Recommendation'), console.log('To rec', val)}}
            initial={0}
                selectedColor={colors.green}
                textColor={'rgba(120, 120, 128, 0)'}
                buttonColor={colors.white}
                borderColor={colors.green}
                backgroundColor={'rgba(120, 120, 128, 0.16)'}
                options={[
                    { value: false, imageIcon: require('../../assets/images/restaurant.png'), activeColor: 'white' },
                    { value: true, imageIcon: require('../../assets/images/map.png'), activeColor: 'white' }
                ]} />
            <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: wp(20.3)}} >
                <Text style={[styles.value]}>В ресторане</Text>
            </View>
        </View>),
        headerRight: () => 
        ( <View style={styles.buttonsBox}>
            <TouchableOpacity onPress={() => navigation.navigate('Favs')} >
              <Image source={require('../../assets/images/favourites.png')}
                style={styles.favsImage}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} >
              <Image source={require('../../assets/images/shop.png')}
                style={styles.shopImage} />
            </TouchableOpacity>
          </View> ),
        }} />
        */