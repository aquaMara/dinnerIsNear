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
import { useNavigation } from '@react-navigation/native';
import dishesIntroduction from '../../../data/dishesIntroduction';

const { height } = Dimensions.get('screen');

export default function ROrderPart(meal, ) {

    const navigation = useNavigation();
    const [dishesIntro, setDishesIntro] = useState([]);

    useEffect(() => {
        setDishesIntro(dishesIntroduction);
    }, []);

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
    });
    
    if (!fontsLoaded) {
        return null;
    }

  return (
    <View style={styles.orderBlock}>
        <View>
            <Text style={styles.orderText}>Выберите блюда из меню или заведение</Text>
        </View>
        <TouchableOpacity style={[globalStyles.mainButton, {marginTop: hp(1.07), alignSelf: 'flex-start',}]}>
            <Text style={[styles.buttonText, {color: colors.white}]}>Меню ресторанов поблизости</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.mainButton, styles.button]}>
            <Text style={[styles.buttonText, {color: colors.green}]}>Выбрать заведение</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    orderBlock: {
        height: hp(18.99),
        width: wp(95.9),
        marginTop: hp(2.37),
        alignSelf: 'flex-end',
    },
    orderText: {
        color: colors.grey,
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        fontFamily: 'SF-Pro-Regular',
    },
    button: {
        backgroundColor: colors.white,
        marginTop: hp(1.07),
        alignSelf: 'flex-start',
        shadowColor: 'rgba(0, 0, 0, 0.18)',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowRadius: hp(2.13),
        shadowOpacity: 1,
    },
    buttonText: {
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        fontFamily: 'SF-Pro-Bold',
    },
    dishesLine: {
        height: hp(9.36),
        height: hp(10.4),
        width: wp(95.9),
        marginTop: hp(2.37),
    },
    dishText: {
        color: colors.black,
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        fontFamily: 'SF-Pro-Regular',
        textAlign: 'center',
    },
    dishImage: {
        // width: wp(15.4),
        // height: hp(7.1),
        height: wp(14),
        width: wp(14),
        aspectRatio: 1,
        borderRadius: hp(1.54),
    }
})