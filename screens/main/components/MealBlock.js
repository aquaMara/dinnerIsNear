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

const { height } = Dimensions.get('screen');

export default function MealBlock( props ) {

    const { currentUser, currentUserData } = useAuth();
    //const id = currentUser.uid;
    const id = '56heP7RFY7ZLGTwepBzjBTsdiA63';

    const [orderVisibility, setOrderVisibility] = useState(true);

  return (
    <View style={styles.mealBlock}>
        <View style={styles.topLine}>
          <Text style={styles.recommendationText}>{props.name}</Text>
          <TouchableOpacity onPress={() => console.log('openMenu')} style={{marginRight: 0, marginLeft: 'auto', alignSelf: 'center'}}>
            <Image source={require('../../../assets/images/leftChevron.png')}
                style={{width: wp(5.13), height: hp(1.38)}} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomLine}>
          <Text style={styles.greyText}>Рекомендуем</Text>
          <Text style={[styles.greyText, {marginRight: 0, marginLeft: 'auto'}]}>~{props.calories}ккал</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mealBlock: {
        height: hp(9.01),
        width: wp(91.8),
        marginTop: hp(2.37),
        backgroundColor: colors.white,
        borderRadius: hp(1.54),
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowColor: 'rgba(0, 0, 0, 0.18)',
        shadowRadius: hp(2.13),
        alignSelf: 'center',
        alignItems: 'center'
    },
    topLine: {
        width: wp(76.7),
        height: hp(2.37),
        marginTop: hp(2.07),
        display: 'flex',
        flexDirection: 'row',
    },
    bottomLine: {
        width: wp(76.7),
        height: hp(1.98),
        marginTop: hp(0.59),
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
    greyText: {
        color: colors.gre,
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        fontFamily: 'SF-Pro-Regular',
    },
})