import { Dimensions, View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react';
import data from '../chat/data';
console.log(data)
import { useFonts } from 'expo-font';
import { Linking } from 'react-native';
import { firebaseConfig } from '../../firebase-config';
import firebase from "firebase/compat";
import { globalStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { collection, getDoc, getFirestore, getDocs, collectionGroup, query, where, doc, documentId } from "@firebase/firestore";
import { FlatList } from 'react-native';

import gql from 'graphql-tag';

const MY_QUERY = gql`
query getDishes{
    findAll {
        id
        dishName
        dishCalories
        dishProtein
        dishFats
        dishCarbohydrates
        dishPrice
    }
}
`;

const { height } = Dimensions.get('screen');

const Item = ({ dishName, dishCalories, dishProtein, dishFats, dishCarbohydrates, dishPrice }) => (
    <View style={styles.block}>
        <Image source={require('../../assets/images/dish.png')} style={styles.image} resizeMode='cover' />
        <View style={[styles.dishName, {display: 'flex', flexDirection: 'column'}]}>
            <Text style={styles.dishText}>{dishName}</Text>
            <Text style={styles.dishText}>{dishCalories} ккал</Text>
        </View>
        <View style={styles.pfcBlock}>
            <View><Text>{dishProtein} Б</Text></View>
            <View style={{marginHorizontal: wp(2.56)}}><Text>{dishFats} Ж</Text></View>
            <View><Text>{dishCarbohydrates} У</Text></View>
        </View>
        <TouchableOpacity style={styles.littleButton}>
            <Text style={styles.buttonText}>{dishPrice}р</Text>
        </TouchableOpacity>
    </View>
  );

  const d = [
    {
        id: '1',
        dishName: 'Цезарь с креветками',
        dishCalories: 199,
        dishProtein: 6,
        dishFats: 16,
        dishCarbohydrates: 5,
        dishPrice: 28
    },
    {
        i: '2',
        dishName: 'Цезарь с курицей',
        dishCalories: 201,
        dishProtein: 13,
        dishFats: 14,
        dishCarbohydrates: 15,
        dishPrice: 23
    },
    {
        id: '3',
        dishName: 'Салат чука',
        dishCalories: 69,
        dishProtein: 1,
        dishFats: 5,
        dishCarbohydrates: 4,
        dishPrice: 18
    },
];
  

export default function MenuScreen() {

    const [dishes, setDishes] = useState([{}]);
    const db = getFirestore();
    const colRef = collection(db, 'dishes');
    console.log('dd', data)

    const renderItem = ({ item }) => (
        <Item dishName ={item.dishName} dishCalories={item.dishCalories}
            dishProtein={item.dishProtein} dishFats={item.dishFats}
            dishCarbohydrates={item.dishCarbohydrates} dishPrice={item.dishPrice}/>
      );

    useEffect(() => {
        
        //setDishes(d)
        setDishes(data)

    }, [])

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
      });
      
      if (!fontsLoaded) {
        return null;
      }

  return (
    <SafeAreaView style={{flex: 1}}>
        <FlatList
            numColumns={2}
            data={dishes}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    displayGrid: {
        display: 'flex',
        flexDirection: 'row'
    },
    block: {
        flex: 0.5,
        backgroundColor: colors.white,
        height: hp(29.03),
        width: wp(43.59),
        borderRadius: hp(2.37),
        alignItems: 'center',
        marginBottom: hp(2.13)
    },
    littleButton: {
        width: wp(40.51),
        height: hp(3.8),
        backgroundColor: colors.green,
        borderRadius: hp(2.61),
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        fontFamily: 'SF-Pro-Bold',
        textAlign: 'center',
    },
    dishText: {
        color: colors.white,
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        fontFamily: 'SF-Pro-Medium',
    },
    pfcText: {
        color: colors.backgroundColor,
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        fontFamily: 'SF-Pro-Regular',
    },
    image: {
        width: hp(20.14),
        height: hp(20.14),
    },
    dishName: {
        width: wp(37.44),
        height: hp(4.74),
        marginTop: -hp(5.92),
    },
    pfcBlock: {
        marginTop: hp(1.19),
        width: wp(37.44),
        height: hp(4.38),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
})