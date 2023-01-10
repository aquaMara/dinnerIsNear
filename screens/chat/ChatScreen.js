import { Dimensions, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/styles';
import { useAuth } from '../../auth/AuthProvoder';
import firebase from 'firebase/compat';
import { collection, getDoc, getFirestore, getDocs, collectionGroup, query, where, doc, documentId } from "@firebase/firestore";
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import dishesIntroduction from '../../data/dishesIntroduction';

const { height } = Dimensions.get('screen');

export default function ChatScreen() {

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
      });
      
      if (!fontsLoaded) {
        return null;
      }


  return (
    <View style={{flex: 1, backgroundColor: colors.white, alignItems: 'center'}}>
      <Image source={require('../../assets/images/Vector.png')} style={styles.image}/>
      <View style={[styles.block]}>
        <Text style={styles.titleText}>Психотерапевт</Text>
        <Text style={styles.bodyText}>Если вы испытываете психологический дискомфорт после или во время еды 
        - рекомендуем вам обратиться к квалифицированному психотерпевту 
        в области расстройств и нарушений пищевого поведения.</Text>
        <TouchableOpacity style={[globalStyles.mainButton, {marginBottom: hp(1.9), width: wp(83.6)}]}
            onPress={() => Linking.openURL('whatsapp://send?phone=+375447659068')} >
            <Text style={styles.buttonText}>Написать психотерапевту</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.block]}>
        <Text style={styles.titleText}>Нутрициолог</Text>
        <Text style={styles.bodyText} numberOfLines={5} ellipsizeMode='middle' >Если вы хотите получить консультацию нутрициолога, получить 
        назначение на сдачу анализов или учесть имеющиеся анализы и диагнозы в планировании вашего питания, 
        то рекомендуем вам обратиться к сертифицированному нутрициологу.</Text>
        <TouchableOpacity style={[globalStyles.mainButton, {marginBottom: hp(1.9), width: wp(83.6)}]}
            onPress={() => Linking.openURL('whatsapp://send?phone=+375447659068')}>
            <Text style={styles.buttonText}>Написать нутрициологу</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
        width: wp(24.1),
        height: hp(11.14),
        marginTop: hp(2.84)
    },
    block: {
        width: wp(91.8),
        marginTop: hp(3.55),
        borderRadius: wp(5.13),
        backgroundColor: colors.white,
        shadowColor: 'rgba(0, 0, 0, 0.18)',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowRadius: hp(2.13),
        shadowOpacity: 1,
    },
    titleText: {
        color: colors.black,
        fontSize: RFValue(34, height),
        lineHeight: hp(4.81),
        fontFamily: 'SF-Pro-Bold',
        textAlign: 'center',
        marginTop: hp(1.9),
    },
    bodyText: {
        color: colors.grey2,
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        fontFamily: 'SF-Pro-Regular',
        textAlign: 'center',
        marginTop: hp(1.66),
        marginBottom: hp(2.49)
    },
    buttonText: {
        color: colors.white,
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        fontFamily: 'SF-Pro-Bold',
      },
})