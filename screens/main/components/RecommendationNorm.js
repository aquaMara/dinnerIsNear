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

export default function RecommendationNorm({navigation, route}) {

    const [calorieIntake, setCalorieIntake] = useState(1900);
    const [protein, setProtein] = useState(60);
    const [fats, setFats] = useState(50);
    const [carbohydrates, setCarbohydrates] = useState(70);

    const [currentCalorieIntake, setCurrentCalorieIntake] = useState(1900);
    const [currentProtein, setCurrentProtein] = useState(160);
    const [currentFats, setCurrentFats] = useState(150);
    const [currentCarbohydrates, setCurrentCarbohydrates] = useState(170);

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
    });
    
    if (!fontsLoaded) {
        return null;
    }

  return (
    <View style={styles.recommendationNorm}>
        <View style={styles.textBlock}>
            <Text style={styles.recommendationText}>Рекомендуемая норма</Text>
            <Text style={styles.amountText}>{calorieIntake} ккал</Text>
        </View>
        <View style={[styles.circles, {marginTop: hp(1.19)}]}>
            <View style={[styles.circle, {marginLeft: 0, marginRight: 'auto'}]}>
                <Text style={styles.recommendationText}>{protein} Б</Text>
            </View>
            <View style={styles.circle}>
                <Text style={styles.recommendationText}>{fats} Ж</Text>
            </View>
            <View style={[styles.circle, {marginLeft: 'auto', marginRight: 0}]}>
                <Text style={styles.recommendationText}>{carbohydrates} У</Text>
            </View>
        </View>
        <View style={styles.todaysResult}>
            <Image source={require('../../../assets/images/topLine.png')} style={{width: wp(83.08), height: hp(0.19)}}/>
            <View style={styles.todaysBlocks}>
                <View style={[styles.todaysBlock, {marginLeft: 0, marginRight: wp(7.3)}]}>
                    <Text style={styles.todaysText}>{currentProtein} Б</Text>
                </View>
                <View style={styles.todaysBlock}>
                    <Text style={styles.todaysText}>{currentFats} Ж</Text>
                </View>
                <View style={[styles.todaysBlock, {marginRight: 0, marginLeft: wp(7.3)}]}>
                    <Text style={styles.todaysText}>{currentCarbohydrates} У</Text>
                </View>
                <View style={styles.todaysCaloriesBlock}>
                    <Text style={styles.todaysCaloriesText}>{currentCalorieIntake} ккал</Text>
                </View>
            </View>
            <Image source={require('../../../assets/images/topLine.png')} style={{width: wp(83.08), height: hp(0.47)}}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    recommendationNorm: {
        height: hp(17.3),
        width: wp(91.8),
        marginTop: hp(3.55),
        //paddingVertical: hp(1.42),
        //paddingHorizontal: wp(4.36),
        backgroundColor: colors.white,
        borderRadius: hp(2.36),
        alignSelf: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.18)',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowRadius: wp(2.1),
        shadowOpacity: 1,
    },
    textBlock: {
        height: hp(2.37),
        width: wp(83.08),
        display: 'flex',
        flexDirection: 'row',
        marginTop: hp(1.42),
      },
      recommendationText: {
        color: colors.black,
        fontSize: RFValue(17, height),
        lineHeight: hp(2.37),
        fontFamily: 'SF-Pro-Bold',
        alignSelf: 'center',
      },
      amountText: {
        color: colors.black,
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        fontFamily: 'SF-Pro-Regular',
        alignSelf: 'flex-end',
        marginRight: 0,
        marginLeft: 'auto',
      },
      circles: {
        display: 'flex',
        flexDirection: 'row',
        width: wp(83.08),
      },
      circle: {
        height: hp(4.15),
        width: wp(23.08),
        borderColor: colors.green,
        borderWidth: hp(0.24),
        borderRadius: 51,
        alignItems: 'center',
        justifyContent: 'center'
    },
    todaysResult: {
        width: wp(83.08),
        height: hp(4.38),
        marginTop: hp(2.37),

    },
    todaysBlocks: {
        display: 'flex',
        flexDirection: 'row',
        width: wp(83.08),
        marginVertical: hp(0.5),
        
    },
    todaysBlock: {
        height: hp(2.61),
        width: wp(13.85),
        textAlign: 'left',
    },
    todaysText: {
        color: colors.black,
        fontSize: RFValue(18, height),
        lineHeight: hp(2.58),
        width: wp(13.85),
        fontFamily: 'SF-Pro-Regular',
    },
    todaysCaloriesBlock: {
        height: hp(2.61),
        width: wp(23.85),
        marginRight: 0,
        marginLeft: 'auto',
    },
    todaysCaloriesText: {
        color: colors.black,
        fontSize: RFValue(18, height),
        lineHeight: hp(2.58),
        textAlign: 'center',
        fontFamily: 'SF-Pro-Bold',
    },
})