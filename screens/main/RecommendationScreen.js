import { Dimensions, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/styles';
import { useAuth } from '../../auth/AuthProvoder';
import { RefreshControl } from 'react-native';
import RecommendationNorm from './components/RecommendationNorm';
import MealBlock from './components/MealBlock';
import * as SecureStore from 'expo-secure-store';
import { countMeals } from '../../functions/CountMeals';
import CaloriesForAMeal from './components/CaloriesForAMeal';
import OrderPart from './components/OrderPart';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('screen');

export default function RecommendationScreen() {

    const navigation = useNavigation();
    const [refreshing, setRefreshing] = React.useState(false);
    const {mealsCount, setMealsCount, calories, setCalories} = useAuth();
    const [meals, setMeals] = useState([]);
    
    const [isFoodEmpty, setIsFoodEmpty] = useState(true);
    const [todayFood, setTodayFood] = useState([]);
    const { eatenMealsBlockMealsVisible, setEatenMealsBlockMealsVisible } = useState(true);

    const [eatenBottomBlockVisibility, setEatenBottomBlockVisibility] = useState(false);

    const FormattedDate = () => {
      const dateToday = new Date();
      var mm = dateToday.getMonth() + 1;
      return dateToday.getFullYear() + '-' + mm + '-' + dateToday.getDate();
    }

    const addMeal = async () => {
      const today = FormattedDate();
      if (mealsCount < 6) {
        setMealsCount(prev => mealsCount + 1);
        setMeals( prev => countMeals(mealsCount + 1, calories));
        let name = today + 'mealsCount';
        await SecureStore.setItemAsync(name, (mealsCount + 1).toString());
      }
    }
    
    const changeBlockVisibility = (givenId) => {
      setEatenBottomBlockVisibility(false);
      const changedMeals = meals.map(meal => {
        if (meal.id === givenId) {
          return {
            ...meal,
            visible: !meal.visible, 
          }
        } else {
          // return meal;
          return {
            ...meal,
            visible: false, 
          }
        }
      })
      setMeals(changedMeals);
    }

    const changeEatenBlockVisibility = async (mealId) => {
      let todayFoodData = await SecureStore.getItemAsync('todayFood');
      let todayFood = JSON.parse(todayFoodData);

      if (todayFood != null) {

        if (todayFood.length > 0) {
          let todayMealFood = todayFood.filter(obj => {
            return obj.mealId == mealId;
          });
          
          var newArray = [];
          var lookupObject  = {};

          for(var i in todayMealFood) {
              lookupObject[todayMealFood[i]['id']] = todayMealFood[i];
          }

          for(i in lookupObject) {
              newArray.push(lookupObject[i]);
          }

          if (todayMealFood.length > 0) {
            //setTodayFood(todayMealFood);
            setTodayFood(newArray)
            setIsFoodEmpty(false);
          } else {
            setIsFoodEmpty(true);
          }
        }
      }
      setEatenBottomBlockVisibility(prevCheck => !prevCheck);
    }

    const onRefresh = () => {
      setRefreshing(true);
      setMeals(countMeals(mealsCount, calories));
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }

    useEffect(() => {
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
          {meal.visible && (
            <View style={[styles.appearedBlock, {flex: 1}]}>
              <View style={styles.mealLine}>
                <Text style={styles.recommendationText}>{meal.name}</Text>
                <TouchableOpacity onPress={() => changeBlockVisibility(meal.id)} style={styles.arrowButton}>
                  <Image source={require('../../assets/images/chevronUp.png')}
                      style={{width: wp(5.13), height: hp(1.38), alignSelf: 'flex-end'}} />
                </TouchableOpacity>
              </View>
              <CaloriesForAMeal mealId={meal.id} />
              <OrderPart meal={meal} navigation={navigation}/>
              <View style={{alignItems: 'center'}}>
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
                    {!isFoodEmpty && (todayFood.length > 0 && todayFood.map((tfd) =>(
                    <View key={tfd.id}>
                    <View style={styles.mealBlock2} key={tfd.id} >
                      <View>
                          <Image source={{uri: tfd.dishPath}}
                              style={styles.image}/>
                      </View>
                      <View style={styles.dishBlock}>
                          <View><Text style={styles.dishTitle} numberOfLines={1} ellipsizeMode='tail'>{tfd.dishName}</Text></View>
                          <View style={{display: 'flex', flexDirection: 'row', marginBottom: 0, marginTop: 'auto'}}>
                              <View style={{width: wp(14), marginRight: wp(2.31)}}><Text style={[styles.dishInfo]}>К{tfd.dishCalories}</Text></View>
                              <View style={{width: wp(13), marginRight: wp(2.31)}}><Text style={styles.dishInfo}>Б{tfd.dishProtein}</Text></View>
                              <View style={{width: wp(13), marginRight: wp(2.31)}}><Text style={styles.dishInfo}>Ж{tfd.dishFats}</Text></View>
                              <View style={{width: wp(13)}}><Text style={styles.dishInfo}>У{tfd.dishCarbohydrates}</Text></View>
                          </View>
                      </View>
                    </View>
                    </View>
                    ))
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
// <MealBlock key={meal.id} name={meal.name} calories={meal.calories} />
const styles = StyleSheet.create({
  mealBlock: {
      height: hp(9.01),
      width: wp(91.8),
      marginTop: hp(2.37),
      backgroundColor: colors.white,
      borderRadius: hp(1.54),
      alignSelf: 'center',
      alignItems: 'center',
      shadowOffset: {width: wp(0), height: hp(0.12)},
      shadowColor: colors.black,
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
    width: wp(100),
    //height: hp(42.04),
    marginTop: hp(2.37),
    alignItems: 'center',
    minHeight: hp(31.04),
    flex: 1
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
    shadowOffset: {width: wp(0), height: hp(0.12)},
    shadowColor: colors.black,
    shadowRadius: wp(2.05),
    shadowOpacity: 0.18,
  },

  mealBlock2: {        // no height !!!
    width: wp(91.8),
    height: hp(5.92),
    marginTop: hp(2.49),
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    width: wp(12.82),
    height: hp(5.92),
    borderRadius: wp(3.33),
    aspectRatio: 1
  },
  dishBlock: {
    width: wp(56.4),
    marginLeft: wp(2.31),
    display: 'flex',
    flexDirection: 'column',
  },
  dishTitle: {
    fontSize: RFValue(17, height),
    fontFamily: 'SF-Pro-Medium',
    lineHeight: hp(2.4),
  },
  dishInfo: {
    color: colors.black,
    opacity: 0.2,
    fontSize: RFValue(15, height),
    fontFamily: 'SF-Pro-Regular',
    lineHeight: hp(2.12),
  },
})