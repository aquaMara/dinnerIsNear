import { Dimensions, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';
import { colors } from '../../../styles/colors';
import { globalStyles } from '../../../styles/styles';
import { useAuth } from '../../../auth/AuthProvoder';
import firebase from 'firebase/compat';
import { collection, getDoc, getFirestore, getDocs, collectionGroup, query, where, doc, documentId } from "@firebase/firestore";
import { FlatList } from 'react-native';

const { height } = Dimensions.get('screen');

export default function EatenPart() {

  const [invisible, setInvisible] = useState(false);

  const changeEatenBlockVisibility = () => {
    setInvisible(prev => !prev);
  }

    const dishesEaten = [
        {id: 1, name: 'Салаты', image: '../../../assets/images/picture_1.png'},
        {id: 2, name: 'Суши', image: '../../../assets/images/picture_1.png'},
        {id: 3, name: 'Пицца', image: '../../../assets/images/picture_1.png'},
        {id: 4, name: 'Суши', image: '../../../assets/images/picture_1.png'},
        {id: 5, name: 'Пицца', image: '../../../assets/images/picture_1.png'},
        {id: 6, name: 'Суши', image: '../../../assets/images/picture_1.png'},
        {id: 7, name: 'Пицца', image: '../../../assets/images/picture_1.png'},
    ]

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
    });
    
    if (!fontsLoaded) {
        return null;
    }

  return (
    <View style={{alignItems: 'center'}}>
      <View style={styles.introductionLine}>
        <Text style={styles.recommendationText}>Вы съели:</Text>
        <TouchableOpacity onPress={() => changeEatenBlockVisibility} style={styles.arrowButton}>
            <Image source={require('../../../assets/images/chevronUp.png')}
                style={{width: wp(5.13), height: hp(1.38), alignSelf: 'flex-end'}} />
        </TouchableOpacity>
      </View>
      {
        !invisible && (
        <View style={styles.eatenBlock}>
          <Text style={styles.greyText}>Вы ещё ничего не заказали или не добавили, поэтому тут пусто</Text>
        </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
    introductionLine: {
        width: wp(91.8),
        height: hp(2.37),
        marginTop: hp(2.67),
        display: 'flex',
        flexDirection: 'row', 
    },
    recommendationText: {
        color: colors.black,
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        fontFamily: 'SF-Pro-Bold',
        alignSelf: 'center',
    },
    arrowButton: {
      marginRight: 0,
      marginLeft: 'auto',
      alignSelf: 'center',
      justifyContent: 'center',
      height: hp(2.98),
      width: wp(7),
    },
    eatenBlock: {
      width: wp(100),
      height: hp(3.8),
      marginTop: hp(1.84),
      marginBottom: hp(1.78),
      marginHorizontal: 0,
      alignItems: 'center',
      borderWidth: 1,
  },
  greyText: {
      color: colors.grey,
      fontSize: RFValue(13, height),
      lineHeight: hp(1.84),
      fontFamily: 'SF-Pro-Regular',
      textAlign: 'center',
      width: wp(65.9),
  },

})