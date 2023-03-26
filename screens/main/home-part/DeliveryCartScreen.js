import { ScrollView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import { countMeals } from '../../../functions/CountMeals';
import { useDeliveryCart } from '../../../auth/DeliveryCartProvider';
import { useAuth } from '../../../auth/AuthProvoder';
import { globalStyles } from '../../../styles/styles';
import * as SecureStore from 'expo-secure-store';
import { countCaloriesInCart, countProteinInCart } from '../../../functions_secure_store/Cart';
import { countFatsInCart, countCarbohydratesInCart } from '../../../functions_secure_store/Cart';

const { height } = Dimensions.get('screen');

export default function DeliveryCartScreen() {

  const { calories, setCalories } = useAuth();
  const { dcart, setDcart } = useDeliveryCart();
  const [meals, setMeals] = useState();
  const { setCaloriesCount, setProteinCount, setFatsCount, setCarbohydratesCount } = useAuth();

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

const countMinHeight = (mealId) => {
    if (mealId === 0) {
        return hp(74)
    } if (mealId === 1) {
        return hp(62.5)
    } if (mealId === 2) {
        return hp(51)
    } if (mealId === 3) {
        return hp(39.5)
    } if (mealId === 4) {
        return hp(28)
    } if (mealId === 5) {
        return hp(16.5)
    } else {
        return hp(5)
    }
}

const decreseDishAmount = (mealId, dishId) => {
    var cart2 = dcart.filter((obj) => {
        if (obj.mealId == mealId && obj.id == dishId) {
            obj.amount = obj.amount - 1;
            if (obj.amount > 0) {
                return obj;
            }
        } else {
            return obj;
        }
    })
    setDcart(cart2);
}

const increaseDishAmount = (mealId, dishId) => {
    var cart2 = dcart.filter((obj) => {
        if (obj.mealId == mealId && obj.id == dishId) {
            obj.amount = obj.amount + 1;
            return obj;
        } else {
            return obj;
        }
    })
    setDcart(cart2);
}

const addToEaten = async (mealId) => {
    const date = FormattedDate();
    var foodForCurrentMeal = dcart.filter(obj => {
        if (obj.mealId === mealId) {
            obj.date = date;
            return obj;
        }
    });
    await saveTodayFood(foodForCurrentMeal);

    let totalCalories = 0, totalProtein = 0, totalFats = 0, totalCarbohydrates = 0;
    foodForCurrentMeal.forEach(dish => {
        totalCalories += (dish.dishCalories * dish.amount);
    });
    foodForCurrentMeal.forEach(dish => {
        totalProtein += (dish.dishProtein * dish.amount);
    });
    foodForCurrentMeal.forEach(dish => {
        totalFats += (dish.dishFats * dish.amount);
    });
    foodForCurrentMeal.forEach(dish => {
        totalCarbohydrates += (dish.dishCarbohydrates * dish.amount);
    });
    setCaloriesCount(prev => [...prev, {mealId, totalCalories}]);
    setProteinCount(prev => [...prev, {mealId, totalProtein}]);
    setFatsCount(prev => [...prev, {mealId, totalFats}]);
    setCarbohydratesCount(prev => [...prev, {mealId, totalCarbohydrates}]);

    await saveNutrition(mealId, date, totalCalories, totalProtein, totalFats, totalCarbohydrates);
    deleteEatenFromCart(mealId);
}

const getWeekTags = async () => {
    let weekTagsData = await SecureStore.getItemAsync('weekTags');
    let weekTags = JSON.parse(weekTagsData);
    return weekTags;
}

const saveTodayFood = async (foodForCurrentMeal) => {
    let weekTagsData = await SecureStore.getItemAsync('weekTags');
    let weekTags = JSON.parse(weekTagsData);
    for (let i = 0; i < foodForCurrentMeal.length; i++) {
        for (let j = 0; j < weekTags.length; j++) {
            if (foodForCurrentMeal[i].tags.includes(weekTags[j].name)) {
                weekTags[j].amount--;
            }
        }
    }
    weekTags = weekTags.filter(obj => {
        return obj.amount > 0;
    })

    await SecureStore.setItemAsync('weekTags', JSON.stringify(weekTags));

    const today = FormattedDate();
    let exists = await SecureStore.getItemAsync('todayFood');
    let todayFood = [];
    if (exists) {
        todayFood = JSON.parse(exists)
        // delete outdated food
        todayFood = todayFood.filter(obj => {
            if (obj.date == today) {
                return obj;
            }
        })
    }
    for (let i = 0; i < foodForCurrentMeal.length; i++) {
        todayFood.push(foodForCurrentMeal[i]);
    }
    const data = JSON.stringify(todayFood);
    await SecureStore.setItemAsync('todayFood', data);
}

const saveNutrition = async (mealId, date, totalCalories, totalProtein, totalFats, totalCarbohydrates) => {
    //await SecureStore.deleteItemAsync(date);
    let exists = await SecureStore.getItemAsync(date);
    const newObject = {mealId, date, totalCalories, totalProtein, totalFats, totalCarbohydrates};
    let eatenMeals = [];
    if (exists) {
        eatenMeals = JSON.parse(exists)
    }
    eatenMeals.push(newObject);
    const data = JSON.stringify(eatenMeals);
    await SecureStore.setItemAsync(date, data);
}

const FormattedDate = () => {
    const dateToday = new Date();
    var mm = dateToday.getMonth() + 1;
    return dateToday.getFullYear() + '-' + mm + '-' + dateToday.getDate();
}

const deleteEatenFromCart = (mealId) => {
    var cart2 = dcart.filter(obj => {
        return obj.mealId != mealId
    })
    setDcart(cart2);
}

  useEffect(() => {
    setMeals(countMeals(6, calories));
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
    <ScrollView style={{backgroundColor: colors.white, flex: 1}}>
    { meals.length > 0 && meals.map((meal) =>(
    <View key={meal.id} style={!meal.visible && styles.mealInvisible} >
        <View style={styles.topLine}>
            <Text style={[ styles.titleText, !meal.visible && {marginLeft: wp(5.13)} ]}>{meal.name}</Text>
            <TouchableOpacity onPress={() => changeBlockVisibility(meal.id)} style={[styles.arrowButton, !meal.visible && {marginRight: wp(4.1)}]}>
                {meal.visible ? (<Image source={require('../../../assets/images/chevronUp.png')}
                    style={{width: wp(5.13), height: hp(1.38), alignSelf: 'flex-end'}} />)
                : (<Image source={require('../../../assets/images/leftChevron.png')}
                    style={{width: wp(5.13), height: hp(1.38)}} />)}
            </TouchableOpacity>
        </View>
        {meal.visible && (
        <View style={{ minHeight: countMinHeight(meal.id) }}>
        <View style={styles.middleLine}>
            <View style={styles.middleBlock}>
                <Text style={styles.middleBlockText}>
                {countProteinInCart(dcart, meal.id)} Б
                </Text>
            </View>
            <View style={[styles.middleBlock, {marginHorizontal: wp(10)}]}>
                <Text style={styles.middleBlockText}>
                {countFatsInCart(dcart, meal.id)} Ж
                </Text>
            </View>
            <View style={styles.middleBlock}>
                <Text style={styles.middleBlockText}>
                {countCarbohydratesInCart(dcart, meal.id)} У
                </Text>
            </View>
            <View style={styles.middleBlockCalories}>
                <Text style={styles.titleText}>
                {countCaloriesInCart(dcart, meal.id)} ккал
                </Text>
            </View>
        </View>
        <Image source={require('../../../assets/images/rectangle12.png')}
        style={{width: wp(91.8), height: hp(0.47), marginTop: hp(0.59), alignSelf: 'center'}}/>
        { dcart.map((dish) =>(
            dish.mealId == meal.id && ( 
            <View style={styles.mealBlock} key={dish.id} >
            <View>
                <Image source={{uri: dish.dishPath}}
                    style={styles.image}/>
            </View>
            <View style={styles.dishBlock}>
                <View><Text style={styles.dishTitle} numberOfLines={1} ellipsizeMode='tail'>{dish.dishName}</Text></View>
                <View style={{display: 'flex', flexDirection: 'row', marginBottom: 0, marginTop: 'auto'}}>
                    <View style={{width: wp(14), marginRight: wp(2.31)}}><Text style={[styles.dishInfo]}>К{dish.dishCalories}</Text></View>
                    <View style={{width: wp(13), marginRight: wp(2.31)}}><Text style={styles.dishInfo}>Б{dish.dishProtein}</Text></View>
                    <View style={{width: wp(13), marginRight: wp(2.31)}}><Text style={styles.dishInfo}>Ж{dish.dishFats}</Text></View>
                    <View style={{width: wp(13)}}><Text style={styles.dishInfo}>У{dish.dishCarbohydrates}</Text></View>
                </View>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', marginRight: 0, marginLeft: 'auto'}}>
                <TouchableOpacity style={styles.counterButton} onPress={() => decreseDishAmount(meal.id, dish.id)}>
                    <Image source={require('../../../assets/images/counterMinus.png')}
                        style={styles.counterImage}/>
                </TouchableOpacity>
                <View style={{width: wp(6.13), alignItems: 'center', alignSelf: 'center'}}>
                    <Text style={styles.counterText}>{dish.amount}</Text>
                </View>
                <TouchableOpacity style={styles.counterButton} onPress={() => increaseDishAmount(meal.id, dish.id)}>
                    <Image source={require('../../../assets/images/counterPlus.png')}
                        style={styles.counterImage}/>
                </TouchableOpacity>
            </View>
        </View>
        )
        ))}
        <TouchableOpacity onPress={() => addToEaten(meal.id)} style={[globalStyles.mainButton, styles.buttonMargin]}>
            <Text style={styles.buttonText}>Заказать</Text>
        </TouchableOpacity>
        </View>)}
    </View>))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mealInvisible: {
      height: hp(9.01),
      width: wp(91.8),
      marginTop: hp(2.37),
      backgroundColor: colors.white,
      borderRadius: hp(1.54),
      alignSelf: 'center',
      shadowColor: colors.black,
      shadowOffset: {width: wp(0), height: hp(0.12)},
      shadowRadius: hp(2.13),
      shadowOpacity: 0.18,
  },
  topLine: {
      width: wp(91.8),
      marginTop: hp(2.78),
      height: hp(2.37),
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'row',
  },
  arrowButton: {
      marginRight: 0,
      marginLeft: 'auto',
      alignSelf: 'center',
      justifyContent: 'center',
      height: hp(2.98),
      width: wp(7),
  },
  mealBlock: {        // no height !!!
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
  counterText: {
      color: colors.green,
      fontSize: RFValue(19, height),
      fontFamily: 'SF-Pro-Regular',
      lineHeight: hp(2.74),
  },
  counterButton: {
      width: wp(6.13),
      height: hp(5.92),
      justifyContent: 'center'
  },
  counterImage: {
      width: wp(5.13),
      height: hp(2.37),
      aspectRatio: 1,
      alignSelf: 'center'
  },
  buttonText: {
      color: colors.white,
      fontSize: RFValue(17, height),
      lineHeight: hp(2.4),
      fontFamily: 'SF-Pro-Medium',
      textAlign: 'center',
    },
  buttonMargin: {
      marginTop: 'auto',
      marginBottom: 0,
  },
  middleLine: {
      width: wp(91.8),
      height: hp(2.6),
      marginTop: hp(2.31),
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'row',
  },
  middleBlock: {
      width: wp(15.5),
  },
  middleBlockCalories: {
      width: wp(24),
      marginLeft: 'auto',
      marginRight: 0,
  },
  middleBlockText: {
      fontSize: RFValue(18, height),
      fontFamily: 'SF-Pro-Regular',
      lineHeight: hp(2.58),
  },
  titleText: {
      fontSize: RFValue(17, height),
      fontFamily: 'SF-Pro-Bold',
      lineHeight: hp(2.4),
      textAlign: 'right'
  },

})
