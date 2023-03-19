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
import AddressBox from './components/AddressBox';
import RecommendationNorm from './components/RecommendationNorm';
import MealBlock from './components/MealBlock';
import { countMeals } from '../../functions/CountMeals';
import { setStatusBarHidden } from 'expo-status-bar';
import CaloriesForAMeal from './components/CaloriesForAMeal';
import ROrderPart from './components/ROrderPart';
import EatenPart from './components/EatenPart';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native';
import { ImageBackground } from 'react-native';

const { height } = Dimensions.get('screen');


import { RefreshControl } from 'react-native';
import MealEatenDishes from './components/MealEatenDishes';

export default function RestaurantScreen() {

    const navigation = useNavigation();

    const { currentUser, currentUserData } = useAuth();
    const {mealsCount, setMealsCount} = useAuth();
    const { calories, setCalories } = useAuth();
    const { currentUserMeals } = useAuth();
    const { caloriesCount } = useAuth();
    //const id = currentUser.uid;
    //console.log(currentUser.uid)
    const id = 'iLQD9PDWB1d6u5UI5vk6QNYvrwy';
    
    const [caloriesForEachMeal, setCaloriesForEachMeal] = useState(450);
    const [meals, setMeals] = useState([]);
    const [isMainBlockHidden, setIsMainBlockHidden] = useState(false);
    const [orderVisibility, setOrderVisibility] = useState(true);

    const [isFoodEmpty, setIsFoodEmpty] = useState(true);
    const [todayFood, setTodayFood] = useState([]);

    const { eatenMealsBlockMealsVisible, setEatenMealsBlockMealsVisible } = useState(true);

    const [eatenBottomBlockVisibility, setEatenBottomBlockVisibility] = useState(false);

    const addMeal = () => {
      if (mealsCount < 6) {
        setMealsCount(prev => mealsCount + 1);
        setMeals( prev => countMeals(mealsCount + 1, calories) );
      }
    }

    const changeBlockVisibility = (givenId) => {
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

    const changeEatenBlockVisibility = async (mealId) => {
      //await SecureStore.setItemAsync('todayFood', JSON.stringify([]))
      setEatenBottomBlockVisibility(prevCheck => !prevCheck);
      
      console.log('mealId', mealId)
      let todayFoodData = await SecureStore.getItemAsync('todayFood');
      let todayFood = JSON.parse(todayFoodData);
      let todayMealFood = todayFood.filter(obj => {
        return obj.mealId == mealId;
      });
      /*
      
      setTodayFood(todayMealFood);
      console.log('todayMealFood', todayMealFood.length > 0, todayMealFood)
      */
      if (todayMealFood.length > 0) {
        setIsFoodEmpty(false);
      } else {
        setIsFoodEmpty(true);
      }
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = () => {
      setRefreshing(true);
      setMeals(countMeals(mealsCount, calories));
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }

    const RenderItem = ({ item }) => (
      <TouchableOpacity style={styles.block}>    
          <View style={styles.topBlock}>
              <ImageBackground source={{uri: item.dishPath}} 
                  style={styles.dishImage} imageStyle={{borderRadius: hp(2.37)}} resizeMode='cover' >
                  <LinearGradient 
                      colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']}
                      locations={[0.3677, 1]}
                      style={styles.dishImage}></LinearGradient>
              </ImageBackground>
              
              <View style={styles.middleBlock}>
                  <View style={{width: wp(23.08), height: hp(5.92)}}>
                      <Text style={styles.dishText} numberOfLines={2} ellipsizeMode='tail'>{item.dishName}</Text>
                  </View>
                  <View style={{width: wp(12)}}>
                      <Text style={[styles.dishText, {textAlign: 'center'}]}>{item.dishCalories}</Text>
                      <Text style={[styles.dishText, {textAlign: 'center'}]}>ккал</Text>
                  </View>
              </View>
          </View>
          <View style={styles.bottomBlock}>
              <View><Text style={styles.regularText}>{item.dishProtein} Б</Text></View>
              <View style={{marginHorizontal: wp(2.56)}}><Text style={styles.regularText}>{item.dishFats} Ж</Text></View>
              <View><Text style={styles.regularText}>{item.dishCarbohydrates} У</Text></View>
          </View>
      </TouchableOpacity>
  );

    useEffect(() => {
      (async () => {
      
        let todayFoodData = await SecureStore.getItemAsync('todayFood');
        setTodayFood(JSON.parse(todayFoodData));

        
      })();
      setMeals(countMeals(mealsCount, calories));
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
    <ScrollView style={{backgroundColor: colors.white}} 
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <RecommendationNorm />
      {
          meals.length > 0 && meals.map((meal) =>
          <View key={meal.id}>
          {!meal.visible && (
          <TouchableOpacity onPress={() => changeBlockVisibility(meal.id)}>
            <View style={[styles.mealBlock]}>
              <View style={styles.topLine}>
                <Text style={styles.recommendationText}>{meal.name}</Text>
                <View style={styles.arrowButton}>
                  <Image source={require('../../assets/images/leftChevron.png')}
                      style={{width: wp(5.13), height: hp(1.38), alignSelf: 'flex-end'}} />
                </View>
              </View>
              <View style={styles.bottomLine}>
                <Text style={styles.greyText}>Рекомендуем</Text>
                <Text style={[styles.greyText, {marginRight: 0, marginLeft: 'auto'}]}>~{meal.calories}ккал</Text>
              </View>
            </View>
          </TouchableOpacity>)}
          {meal.visible && (
            <View style={[styles.appearedBlock]}>
              <View style={styles.mealLine}>
                <Text style={styles.recommendationText}>{meal.name}</Text>
                <TouchableOpacity onPress={() => changeBlockVisibility(meal.id)} style={styles.arrowButton}>
                  <Image source={require('../../assets/images/chevronUp.png')}
                      style={{width: wp(5.13), height: hp(1.38), alignSelf: 'flex-end'}} />
                </TouchableOpacity>
              </View>
              <CaloriesForAMeal mealId={meal.id} />
              <ROrderPart mealId={meal.id}/>
              <View>
                <View style={styles.introductionLine}>
                  <Text style={styles.recommendationText}>Вы съели:</Text>
                  <TouchableOpacity onPress={() => changeEatenBlockVisibility(meal.id)} style={styles.arrowButton}>
                    {!eatenBottomBlockVisibility && <Image source={require('../../assets/images/leftChevron.png')}
                      style={{width: wp(5.13), height: hp(1.38), alignSelf: 'flex-end'}} />}
                    {eatenBottomBlockVisibility && <Image source={require('../../assets/images/chevronUp.png')}
                      style={{width: wp(5.13), height: hp(1.38), alignSelf: 'flex-end'}} />}
                  </TouchableOpacity>
                </View>                
                {
                  eatenBottomBlockVisibility && (
                    <View>
                    {isFoodEmpty && (
                    <View style={styles.eatenBlock}>
                      <Text style={[styles.greyText, {width: wp(65.9), textAlign: 'center'}]}>Вы ещё ничего не заказали или не добавили, поэтому тут пусто</Text>
                    </View>
                    )}
                    </View>
                )}
                
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
/*
{
                  eatenBottomBlockVisibility && (
                  <View style={styles.eatenBlock}>
                    <Text style={[styles.greyText, {width: wp(65.9), textAlign: 'center'}]}>Вы ещё ничего не заказали или не добавили, поэтому тут пусто</Text>
                  </View>
                  )
                }
*/
const styles = StyleSheet.create({
    mealBlock: {
        height: hp(9.01),
        width: wp(91.8),
        marginTop: hp(2.37),
        backgroundColor: colors.white,
        borderRadius: hp(1.54),
        alignSelf: 'center',
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowRadius: wp(2.05),
        shadowOpacity: 0.18,
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
      minHeight: hp(31.04),
      maxHeight: hp(56.84),
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
      marginLeft: wp(4.1),
      marginBottom: hp(1.84)
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
    //marginTop: hp(1.84),
    marginBottom: hp(1.78),
    marginHorizontal: 0,
    alignItems: 'center',
  },
  alreadyEatenBlock: {
    width: wp(100),
    height: hp(6.8),
    //minHeight: hp(7.12),
    //height: hp(30),
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
  },

  block: {
    backgroundColor: colors.white,
    height: hp(25.12),
    width: wp(43.59),
    borderRadius: hp(2.37),
    marginBottom: hp(2.13),
    shadowOffset: {width: wp(0), height: hp(0.12)},
    shadowColor: colors.black,
    shadowRadius: wp(2.05),
    shadowOpacity: 0.15,
    marginLeft: wp(4.1),
  },
  topBlock: {
    height: hp(20.14),
    width: wp(43.59),
  },
  dishImage: {
    width: wp(43.59),
    height: hp(20.14),
    borderRadius: hp(2.37),
  },
  middleBlock: {
    width: wp(37.44),
    height: hp(5.30),
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -hp(6.45),
  },
  bottomBlock: {
    width: wp(43.59),
    height: hp(2.1),
    marginTop: hp(1.18),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dishText: {
    color: colors.white,
    fontSize: RFValue(17, height),
    lineHeight: hp(2.4),
    fontFamily: 'SF-Pro-Medium'
  },
  regularText: {
    color: colors.black,
    fontSize: RFValue(13, height),
    lineHeight: hp(1.84),
    fontFamily: 'SF-Pro-Regular',
  },
      
  })

  /*
    const db = getFirestore();
    const db1 = firebase.firestore();
    const colRef = collection(db, 'calorie_plan');
    const docRef = doc(db, 'calorie_plan', id)
    const [address, setAddress] = useState('проспект Толстова, 237');
    in useEffect:

    getDocs(colRef).then((snapshot) => {
        let arr = [];
        snapshot.docs.forEach((doc) => {
          arr.push({...doc.data(), id: doc.id})
        })
        console.log(arr);
      }).catch(err => console.log(err));

      getDoc(docRef).then((doc) => {
        console.log('DATAAAAAAAAAAAAAAAAA ', doc.data())
        setCalorieIntake(doc.data().calorieIntake)  // calories
        setProtein(doc.data().protein)
        setFats(doc.data().fats)
        setCarbohydrates(doc.data().carbohydrates)
        setCaloriesForEachMeal(doc.data().caloriesForEachMeal)
        setNumberOfMeals(doc.data().numberOfMeals)  // mealsCount
      }).catch(err => console.log(err))
  */