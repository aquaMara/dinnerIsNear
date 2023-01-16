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
import AddressBox from './components/AddressBox';
import RecommendationNorm from './components/RecommendationNorm';
import MealBlock from './components/MealBlock';
import { countMeals } from '../../functions/CountMeals';
import { setStatusBarHidden } from 'expo-status-bar';
import CaloriesForAMeal from './components/CaloriesForAMeal';
import ROrderPart from './components/ROrderPart';
import EatenPart from './components/EatenPart';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('screen');

export default function RestaurantScreen() {

    const navigation = useNavigation();

    const { currentUser, currentUserData } = useAuth();
    //const id = currentUser.uid;
    const id = '56heP7RFY7ZLGTwepBzjBTsdiA63';
    
    const [caloriesForEachMeal, setCaloriesForEachMeal] = useState(450);
    const [calorieIntake, setCalorieIntake] = useState(1700);
    const [numberOfMeals, setNumberOfMeals] = useState(4);
    const [meals, setMeals] = useState([{}]);
    const [isMainBlockHidden, setIsMainBlockHidden] = useState(false);
    const [orderVisibility, setOrderVisibility] = useState(true);

    const [eatenBottomBlockVisibility, setEatenBottomBlockVisibility] = useState(false);

    const addMeal = () => {
      if (numberOfMeals <= 6) {
        setNumberOfMeals(prev => ++prev);
        setMeals(countMeals(numberOfMeals, calorieIntake));
      }      
    }


    const openMenu = () => {
      navigation.navigate('Menu');
    }

    const changeBlockVisibility = (givenId) => {
      console.log(givenId)
      const changedMeals = meals.map(meal => {
        if (meal.id === givenId) {
          return {
            ...meal,
            visible: !meal.visible, 
          }
        } else {
          return meal;
        }
      })
      setMeals(changedMeals);
    }

    const changeEatenBlockVisibility = () => {
      setEatenBottomBlockVisibility(prevCheck => !prevCheck);
      console.log(eatenBottomBlockVisibility);
    }

    const db = getFirestore();
    const db1 = firebase.firestore();
    const colRef = collection(db, 'calorie_plan');
    const docRef = doc(db, 'calorie_plan', id)
    const [address, setAddress] = useState('проспект Толстова, 237');

    useEffect(() => {

      setMeals(countMeals(numberOfMeals, calorieIntake));
      
      
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
      }).catch(err => console.log(err))
      /// here countMeals
    }, []);

    const [fontsLoaded] = useFonts({
      'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
      'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
      'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
    });
    
    if (!fontsLoaded) {
      return null;
    }

  return (
    <ScrollView style={{backgroundColor: colors.white}}>
      <RecommendationNorm />
      {
          meals.length > 0 && meals.map((meal) =>
          <View key={meal.id}>
          {meal.visible && (
          <View style={[styles.mealBlock]}>
            <View style={styles.topLine}>
              <Text style={styles.recommendationText}>{meal.name}</Text>
              <TouchableOpacity onPress={() => changeBlockVisibility(meal.id)} style={styles.arrowButton}>
                <Image source={require('../../assets/images/leftChevron.png')}
                    style={{width: wp(5.13), height: hp(1.38), alignSelf: 'flex-end'}} />
              </TouchableOpacity>
            </View>
            <View style={styles.bottomLine}>
              <Text style={styles.greyText}>Рекомендуем</Text>
              <Text style={[styles.greyText, {marginRight: 0, marginLeft: 'auto'}]}>~{meal.calories}ккал</Text>
            </View>
          </View>)}
          {!meal.visible && (
            <View style={[styles.appearedBlock, eatenBottomBlockVisibility && {height: hp(40.04)}]}>
              <View style={styles.mealLine}>
                <Text style={styles.recommendationText}>{meal.name}</Text>
                <TouchableOpacity onPress={() => changeBlockVisibility(meal.id)} style={styles.arrowButton}>
                  <Image source={require('../../assets/images/chevronUp.png')}
                      style={{width: wp(5.13), height: hp(1.38), alignSelf: 'flex-end'}} />
                </TouchableOpacity>
              </View>
              <CaloriesForAMeal />
              <ROrderPart name={meal.name} navigation={navigation}/>
              <View style={{alignItems: 'center'}}>
                <View style={styles.introductionLine}>
                  <Text style={styles.recommendationText}>Вы съели:</Text>
                  <TouchableOpacity onPress={changeEatenBlockVisibility} style={styles.arrowButton}>
                    {!eatenBottomBlockVisibility && <Image source={require('../../assets/images/leftChevron.png')}
                      style={{width: wp(5.13), height: hp(1.38), alignSelf: 'flex-end'}} />}
                    {eatenBottomBlockVisibility && <Image source={require('../../assets/images/chevronUp.png')}
                      style={{width: wp(5.13), height: hp(1.38), alignSelf: 'flex-end'}} />}
                  </TouchableOpacity>
                </View>
                {
                  eatenBottomBlockVisibility && (
                  <View style={styles.eatenBlock}>
                    <Text style={[styles.greyText, {width: wp(65.9), textAlign: 'center'}]}>Вы ещё ничего не заказали или не добавили, поэтому тут пусто</Text>
                  </View>
                  )
                }
              </View>
            </View>  
          )}
          </View>
        )}

        <TouchableOpacity onPress={addMeal}
          style={[globalStyles.mainButton, styles.whiteButton]}>
          <Text style={styles.buttonText}>Добавить перекус</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    mealBlock: {
        height: hp(9.01),
        width: wp(91.8),
        marginTop: hp(2.37),
        backgroundColor: colors.white,
        borderRadius: hp(1.54),
        alignSelf: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.18)',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowRadius: hp(2.13),
        shadowOpacity: 1,
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
        color: colors.grey,
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        fontFamily: 'SF-Pro-Regular',
    },
  
    arrowButton: {
      marginRight: 0,
      marginLeft: 'auto',
      alignSelf: 'center',
      justifyContent: 'center',
      height: hp(2.98),
      width: wp(7),
    },
  
    appearedBlock: {
      // width: wp(91.8),
      width: wp(100),
      height: hp(31.04),
      marginTop: hp(2.37),
      alignItems: 'center',
    },
    mealLine: {
      width: wp(91.8),
      height: hp(2.37),
      marginTop: hp(2.07),
      display: 'flex',
      flexDirection: 'row',
      
    },
  
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
  },
  buttonText: {
    color: '#8A8A8E',
    fontSize: RFValue(17, height),
    lineHeight: hp(2.4),
    fontFamily: 'SF-Pro-Bold',
  },
  
whiteButton: {
  backgroundColor: colors.white,
  marginTop: hp(3.56),
  marginBottom: hp(1.54),
  shadowColor: 'rgba(0, 0, 0, 0.18)',
  shadowOffset: {width: wp(0), height: hp(0.12)},
  shadowRadius: hp(2.13),
  shadowOpacity: 1,
}
  
    
  
  })