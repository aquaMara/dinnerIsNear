import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, Dimensions, ImageBackground, View, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../styles/colors';
import { useFonts } from "expo-font";
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { globalStyles } from "../../styles/styles";
import GestureRecognizer from 'react-native-swipe-gestures';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('screen');

export default function AppearingRestrauntDescriptionModal({chooseMessage, visibility, activeRestaurant}) {

    const navigation = useNavigation();

    const moveToRestaurant = async  (id, name, mealId) => {
        let trueTags = await getTags();
        let trueProTags = await getProTags();
        let weekTags = await getWeekTags();
        console.log('weekTags',weekTags, 'trueTags', trueTags, 'trueProTags', trueProTags);
        chooseMessage(activeRestaurant, false);
        navigation.navigate("RestaurantMenu",
          {title: name, restrauntId: id, mealId: mealId, trueTags: trueTags, trueProTags: trueProTags, weekTags: weekTags});
    }
    
    const getTags = async () => {
        let trueTagsData = await SecureStore.getItemAsync('trueTags');
        let trueTags = JSON.parse(trueTagsData)
        return trueTags;
    }
    
    const getProTags = async () => {
        let trueTagsData = await SecureStore.getItemAsync('trueProTags');
        let trueProTags = JSON.parse(trueTagsData);
        return trueProTags;
    }
    
    const getWeekTags = async () => {
        let weekTagsData = await SecureStore.getItemAsync('weekTags');
        let weekTags = JSON.parse(weekTagsData);
        return weekTags;
    }


    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
      });
  
    return (
    activeRestaurant != null && (<GestureRecognizer onSwipeDown={() => chooseMessage(activeRestaurant, false)}>
    <Modal animationType="slide" transparent={true}
        visible={visibility} style={styles.modalStyle}>
        <View style={[styles.centeredView]}>
            <View style={styles.modalView}>
                <ImageBackground source={{uri: activeRestaurant.image}} style={styles.image} imageStyle={{borderRadius: hp(2.37)}} >
                    <LinearGradient 
                        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']}
                        locations={[0, 1]}
                        style={styles.restaurantImage} />
                </ImageBackground>
                <View style={{width: wp(35), height: hp(1.9), marginTop: -wp(5.96), marginRight: wp(8.2), marginLeft: 'auto'}}>
                    <Text style={[styles.greyText, {color: colors.separator, textAlign: 'right'}]}>~ в {activeRestaurant.distanceKM} км от меня</Text>    
                </View>
                <View style={styles.topLine}>
                    <View style={[styles.square, styles.leftSquare]}>
                        <Text style={styles.greyText}>Бар</Text>
                        <Text style={[styles.boldText, {color: colors.black}]} numberOfLines={1} ellipsizeMode='tail'>{activeRestaurant.name}</Text>
                    </View>
                    <View style={[styles.square, styles.rightSquare]}>
                        {activeRestaurant.averageBill <= 0 && 
                            <Text style={[styles.boldText, {color: '#999999', textAlign: 'right'}]}>₽₽₽₽</Text>}
                        {activeRestaurant.averageBill == 1 && 
                            <Text style={[styles.boldText, {color: colors.black, textAlign: 'right'}]}>₽<Text style={{color: '#999999'}}>₽₽₽</Text></Text>}
                        {activeRestaurant.averageBill == 2 && 
                            <Text style={[styles.boldText, {color: colors.black, textAlign: 'right'}]}>₽₽<Text style={{color: '#999999'}}>₽₽</Text></Text>}
                        {activeRestaurant.averageBill == 3 && 
                            <Text style={[styles.boldText, {color: colors.black, textAlign: 'right'}]}>₽₽₽<Text style={{color: '#999999'}}>₽</Text></Text>}
                        {activeRestaurant.averageBill >= 4 && 
                            <Text style={[styles.boldText, {color: colors.black, textAlign: 'right'}]}>₽₽₽₽</Text>}
                        <Text style={[styles.greyText, {textAlign: 'right'}]}>Средний чек</Text>
                    </View>
                </View>
                <Image source={require('../../assets/images/rectangle9.png')} style={styles.topLineImage}/>
                <View style={styles.middleLine}>
                    <View style={styles.middleBlock}>
                        <Text style={styles.blackText}>Адрес</Text>
                        <Text style={styles.greyText} numberOfLines={1} ellipsizeMode='tail'>{activeRestaurant.address}</Text>
                    </View>
                    <View style={styles.middleBlock}>
                        <Text style={styles.blackText}>Часы работы</Text>
                        <Text style={styles.greyText} numberOfLines={1} ellipsizeMode='tail'>{activeRestaurant.workingTime}</Text>
                    </View>
                </View>
                <View style={styles.bottomLine}>
                    <TouchableOpacity style={globalStyles.mainButton} onPress={() => moveToRestaurant(activeRestaurant.id, activeRestaurant.name, 0)}>
                        <Text style={[styles.boldText, {color: colors.white}]}>Перейти в меню ресторана</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={globalStyles.whiteButton} onPress={() => chooseMessage(activeRestaurant, false)}>
                        <Text style={[styles.boldText, {color: colors.grey}]}>Показать на карте</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </Modal>
    </GestureRecognizer>)
  )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: wp(100),
        height: hp(66.71),
        marginBottom: 0,
        marginTop: 'auto',
        backgroundColor: "white",
        borderTopLeftRadius: wp(5.13),
        borderTopRightRadius: wp(5.13),
        alignItems: "center",
        shadowColor: 'rgba(0, 0, 0, 0.18)',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowRadius: wp(2.1),
        shadowOpacity: 1,
    },
    image: {
        width: wp(91.8),
        height: hp(17.78),
        marginTop: hp(1.9),
        borderRadius: wp(2.31),
    },
    topLine: {
        width: wp(91.8),
        height: hp(4.74),
        marginTop: hp(3.49),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    square: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    leftSquare: {
        width: wp(47.95),
    },
    rightSquare: {
        width: wp(22.97),
    },
    boldText: {
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        fontFamily: 'SF-Pro-Medium',
    },
    greyText: {
        color: colors.grey,
        fontSize: RFValue(15, height),
        lineHeight: hp(1.84),
        fontFamily: 'SF-Pro-Regular',
    },
    blackText: {
        color: colors.black,
        fontSize: RFValue(15, height),
        lineHeight: hp(1.84),
        fontFamily: 'SF-Pro-Regular',
    },
    topLineImage: {
        height: hp(0.06),
        width: wp(95.9),
        marginLeft: wp(4.1),
        marginVertical: hp(2.49)
    },
    middleLine: {
        width: wp(91.8),
        height: hp(10.78),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    middleBlock: {
        height: hp(4.62),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    bottomLine: {
        width: wp(91.8),
        height: hp(15.76),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: hp(2.49),
    },
})