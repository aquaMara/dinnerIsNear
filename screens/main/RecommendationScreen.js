import { Dimensions, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/styles';
import { useAuth } from '../../auth/AuthProvoder';
import { countCalories } from '../../functions/CountCalories';
import firebase from 'firebase/compat';
import { collection, getDoc, getFirestore, getDocs, collectionGroup, query, where, doc, documentId } from "@firebase/firestore";

const { height } = Dimensions.get('screen');

export default function RecommendationScreen({navigation, route}) {

    //const { currentUserData, setCurrentUserData } = useAuth();
    // setCurrentUserData('Alyssa')

    const { currentUser, currentUserData } = useAuth();
    const id = currentUser.uid;
    // const id = '56heP7RFY7ZLGTwepBzjBTsdiA63';
    const [calorieIntake, setCalorieIntake] = useState(1900);
    const [protein, setProtein] = useState(60);
    const [fats, setFats] = useState(50);
    const [carbohydrates, setCarbohydrates] = useState(70);
    const [caloriesForEachMeal, setCaloriesForEachMeal] = useState(450);
    const [numberOfMeals, setNumberOfMeals] = useState(4);

    const [orderVisibility, setOrderVisibility] = useState(true);

    const openMenu = () => {
      navigation.navigate('Menu');
    }

    const db = getFirestore();
    const db1 = firebase.firestore();
    const colRef = collection(db, 'calorie_plan');
    const docRef = doc(db, 'calorie_plan', id)

    useEffect(() => {
      
      getDocs(colRef).then((snapshot) => {
        let arr = [];
        snapshot.docs.forEach((doc) => {
          arr.push({...doc.data(), id: doc.id})
        })
        console.log(arr);
      }).catch(err => console.log(err));

      getDoc(docRef).then((doc) => {
        console.log('DATAAAAAAAAAAAAAAAAA ', doc.data())
        setCalorieIntake(doc.data().calorieIntake)
        setProtein(doc.data().protein)
        setFats(doc.data().fats)
        setCarbohydrates(doc.data().carbohydrates)
        setCaloriesForEachMeal(doc.data().caloriesForEachMeal)
        setNumberOfMeals(doc.data().numberOfMeals)
      })
      
    }, []);

    const [fontsLoaded] = useFonts({
      'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
      'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
      'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
    });
    
    if (!fontsLoaded) {
      return null;
    }
// height: hp(9.36), marginTop: hp(5.57)
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{marginTop: hp(7.57)}}>
        
      </View>
      <View style={styles.recommendationNorm}>
        <View style={styles.textBlock}>
            <Text style={[styles.recommendationText]}>Рекомендуемая норма</Text>
            <Text style={[styles.amountText, {marginLeft: wp(20)}]}>{calorieIntake} ккал</Text>
        </View>
        <View style={[styles.circles, {marginTop: hp(1.19)}]}>
          <View style={styles.circle}>
            <Text style={styles.recommendationText}>{protein} Б</Text>
          </View>
          <View style={[styles.circle, {marginHorizontal: wp(6.92)}]}>
            <Text style={styles.recommendationText}>{fats} Ж</Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.recommendationText}>{carbohydrates} У</Text>
          </View>
        </View>
      </View>
      <View style={[styles.mealBlock, {marginTop: hp(2.37)}]}>
        <View style={[styles.line, {height: hp(2.96), marginTop: hp(1.78), marginLeft: wp(5.12)}]}>
          <Text style={[styles.recommendationText, {marginRight: wp(57.19)}]}>Завтрак</Text>
          <TouchableOpacity onPress={openMenu}>
            <Image style={styles.image} source={require('../../assets/images/leftChevron.png')} resizeMode='stretch' />
          </TouchableOpacity>
        </View>
        <View style={[styles.line, {height: hp(1.98), marginTop: hp(0.59), marginLeft: wp(5.12)}]}>
          <Text style={[styles.greyText, {marginRight: wp(46.15)}]}>Рекомендуем</Text>
          <Text style={[styles.greyText]}>~{caloriesForEachMeal}ккал</Text>
        </View>
      </View>
      <View style={[styles.mealBlock, {marginTop: hp(2.37)}]}>
        <View style={[styles.line, {height: hp(2.96), marginTop: hp(1.78), marginLeft: wp(5.12)}]}>
          <Text style={[styles.recommendationText, {marginRight: wp(62.39)}]}>Обед</Text>
          <TouchableOpacity onPress={openMenu}>
            <Image style={styles.image} source={require('../../assets/images/leftChevron.png')} resizeMode='stretch' />
          </TouchableOpacity>
        </View>
        <View style={[styles.line, {height: hp(1.98), marginTop: hp(0.59), marginLeft: wp(5.12)}]}>
          <Text style={[styles.greyText, {marginRight: wp(46.15)}]}>Рекомендуем</Text>
          <Text style={[styles.greyText]}>~{caloriesForEachMeal}ккал</Text>
        </View>
      </View>
      <View style={[styles.mealBlock, {marginTop: hp(2.37)}]}>
        <View style={[styles.line, {height: hp(2.96), marginTop: hp(1.78), marginLeft: wp(5.12)}]}>
          <Text style={[styles.recommendationText, {marginRight: wp(62.39)}]}>Ужин</Text>
          <TouchableOpacity onPress={openMenu}>
            <Image style={styles.image} source={require('../../assets/images/leftChevron.png')} resizeMode='stretch' />
          </TouchableOpacity>
        </View>
        <View style={[styles.line, {height: hp(1.98), marginTop: hp(0.59), marginLeft: wp(5.12)}]}>
          <Text style={[styles.greyText, {marginRight: wp(46.15)}]}>Рекомендуем</Text>
          <Text style={[styles.greyText]}>~{caloriesForEachMeal}ккал</Text>
        </View>
      </View>
      <View style={[styles.mealBlock, {marginTop: hp(2.37)}]}>
        <View style={[styles.line, {height: hp(2.96), marginTop: hp(1.78), marginLeft: wp(5.12)}]}>
          <Text style={[styles.recommendationText, {marginRight: wp(57.19)}]}>Перекус</Text>
          <TouchableOpacity onPress={openMenu}>
            <Image style={styles.image} source={require('../../assets/images/leftChevron.png')} resizeMode='stretch' />
          </TouchableOpacity>
        </View>
        <View style={[styles.line, {height: hp(1.98), marginTop: hp(0.59), marginLeft: wp(5.12)}]}>
          <Text style={[styles.greyText, {marginRight: wp(46.15)}]}>Рекомендуем</Text>
          <Text style={[styles.greyText]}>~{caloriesForEachMeal}ккал</Text>
        </View>
      </View>
    </ScrollView>
  )
}
/*
display: flex,
    //flex-direction: column;
    //align-items: flex-start;
padding: 12px 17px;
gap: 10px;

width: 358px;
height: 146px;


background: #FFFFFF;
box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.18);
border-radius: 20px;


flex: none;
order: 0;
flex-grow: 0;
*/
const styles = StyleSheet.create({
  recommendationNorm: {
    height: hp(17.3),
    width: wp(91.8),
    //paddingVertical: hp(1.42),
    //paddingHorizontal: wp(4.36),
    backgroundColor: colors.white,
    borderRadius: hp(2.36),
    shadowOffset: {width: wp(0), height: hp(0.12)},
    shadowColor: 'rgba(0, 0, 0, 0.18)',
    shadowRadius: hp(2.13),
    alignSelf: 'center',
  },
  textBlock: {
    height: hp(2.37),
    width: wp(47.4),
    display: 'flex',
    flexDirection: 'row',
    marginTop: hp(1.42),
    marginLeft: wp(4.36),
  },
  recommendationText: {
    color: colors.black,
    fontSize: RFValue(17, height),
    lineHeight: hp(2.37),
    fontFamily: 'SF-Pro-Medium',
  },
  amountText: {
    color: colors.black,
    fontSize: RFValue(13, height),
    lineHeight: hp(1.84),
    fontFamily: 'SF-Pro-Regular',
  },
  circles: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: wp(4.36),
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
  mealBlock: {
    height: hp(9.01),
    width: wp(91.8),
    backgroundColor: colors.white,
    borderRadius: hp(1.54),
    shadowOffset: {width: wp(0), height: hp(0.12)},
    shadowColor: 'rgba(0, 0, 0, 0.18)',
    shadowRadius: hp(2.13),
    alignSelf: 'center',
  },
  line: {
    width: wp(81.54), 
    display: 'flex',
    flexDirection: 'row',
  },
  greyText: {
    color: '#6D6D72',
    fontSize: RFValue(13, height),
    lineHeight: hp(1.84),
    fontFamily: 'SF-Pro-Regular',
  },
  image: {
    width: wp(5.1),
    height: hp(1.2),
  }
  })