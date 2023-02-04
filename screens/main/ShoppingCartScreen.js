import { ScrollView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../styles/colors';
import { countMeals } from '../../functions/CountMeals';
import { useShoppingCart } from '../../auth/ShoppingCartProvider';
import { useAuth } from '../../auth/AuthProvoder';
import { globalStyles } from '../../styles/styles';

const { height } = Dimensions.get('screen');

export default function ShoppingCartScreen() {

    const [meals, setMeals] = useState();
    let numberOfMeals = 4;
    let calorieIntake = 1700;
    const { cart, setCart } = useShoppingCart();
    const { currentUserMeals, setCurrentUserMeals} = useAuth();
    const { caloriesCount, setCaloriesCount } = useAuth();
    const { proteinCount, setProteinCount } = useAuth();
    const { fatsCount, setFatsCount } = useAuth();
    const { carbohydratesCount, setCarbohydratesCount } = useAuth();

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

    // dishId = 1 in newElement заменить !!!
    const addToEaten = (mId) => {
        console.log(mId, 'mealId');
        var foodForCurrentMeal = cart.filter(obj => {
            return obj.mealId === mId
        })
        let totalCalories = 0, totalProtein = 0, totalFats = 0, totalCarbohydrates = 0;
        foodForCurrentMeal.forEach(element => {
            totalCalories += element.dishCalories;
        });
        foodForCurrentMeal.forEach(element => {
            totalProtein += element.dishProtein;
        });
        foodForCurrentMeal.forEach(element => {
            totalFats += element.dishFats;
        });
        foodForCurrentMeal.forEach(element => {
            totalCarbohydrates += element.dishCarbohydrates;
        });
        // COUNT NUTRITION
        //setCurrentUserMeals(prev => [...prev, foodForCurrentMeal]);
        //const totalCaloriesObject = {mealId, totalCalories};
        setCaloriesCount(prev => [...prev, {mealId: mId, totalCalories}]);
        setProteinCount(prev => [...prev, {mealId: mId, totalProtein}]);
        setFatsCount(prev => [...prev, {mealId: mId, totalFats}]);
        setCarbohydratesCount(prev => [...prev, {mealId: mId, totalCarbohydrates}]);
        
        console.log("CART !", cart)
        var cart2 = cart.filter(obj => {
            return obj.mealId != mId
        })
        setCart(cart2);
        console.log("CART !2", cart2)
    }

    const filterFunctionToGetOnlyUniqueDishesByIdForCurrentMeal = (mId) => {
        var result = cart.filter(obj => {
            return obj.mealId === mId
        })
        const uniqueResult = [...result.reduce((a,c)=>{
            a.set(c.id, c);
            return a;
        }, new Map()).values()];
          
        return uniqueResult;
    }

    const filterFunctionForTotalCaloriesCount = (mId) => {
        var caloriesForThisMealFromGlobal = caloriesCount.filter(obj => {
            return obj.mealId === mId
        })
        let totalCalories = 0;
        caloriesForThisMealFromGlobal.forEach(element => {
            totalCalories += element.totalCalories;
        });
        return totalCalories;
    }
    const filterFunctionForTotalProteinCount = (mId) => {
        var proteinForThisMealFromGlobal = proteinCount.filter(obj => {
            return obj.mealId === mId
        });
        let totalProtein = 0;
        proteinForThisMealFromGlobal.forEach(element => {
            totalProtein += element.totalProtein;
        });
        return totalProtein;
    }
    const filterFunctionForTotalFatsCount = (mId) => {
        var fatsForThisMealFromGlobal = fatsCount.filter(obj => {
            return obj.mealId === mId
        });
        let  totalFats = 0;
        fatsForThisMealFromGlobal.forEach(element => {
            totalFats += element.totalFats;
        });
        return totalFats;
    }
    const filterFunctionForTotalCarbohydratesCount = (mId) => {
        var carbohydratesForThisMealFromGlobal = carbohydratesCount.filter(obj => {
            return obj.mealId === mId
        });
        let totalCarbohydrates = 0;
        carbohydratesForThisMealFromGlobal.forEach(element => {
            totalCarbohydrates += element.totalCarbohydrates;
        });
        return totalCarbohydrates;
    }

    const addDishToCart = (mId, item) => {
      const {id, dishName, dishCalories, dishProtein, dishFats, dishCarbohydrates, dishPrice} = item;
      const newElement = {mealId: mId, id, dishName, dishCalories, dishProtein, dishFats, dishCarbohydrates, dishPrice}
      setCart(cart => [...cart, newElement]);
    }

    const countNumberOfDishesInAMeal = (mId, ff) => {
        // get all dishes for this meal by meal id
        var result = cart.filter(obj => {
            return obj.mealId === mId
        })
        const idToFind = ff.id;
        let amountOfDishInAMeal = 0;
        result.forEach(element => {
            if(element.id === idToFind) {
                ++amountOfDishInAMeal;
            }
        });
        return amountOfDishInAMeal;
    }

    useEffect(() => {
        setMeals(countMeals(numberOfMeals, calorieIntake));
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
    <ScrollView style={{backgroundColor: colors.white, flex: 1}}>
    { meals.length > 0 && meals.map((meal) =>(
    <View key={meal.id} style={!meal.visible && styles.mealInvisible} >
        <View style={styles.topLine}>
            <Text style={[ styles.titleText, !meal.visible && {marginLeft: wp(5.13)} ]}>{meal.name}</Text>
            <TouchableOpacity onPress={() => changeBlockVisibility(meal.id)} style={[styles.arrowButton, !meal.visible && {marginRight: wp(4.1)}]}>
                {meal.visible ? (<Image source={require('../../assets/images/chevronUp.png')}
                    style={{width: wp(5.13), height: hp(1.38), alignSelf: 'flex-end'}} />)
                : (<Image source={require('../../assets/images/leftChevron.png')}
                    style={{width: wp(5.13), height: hp(1.38)}} />)}
            </TouchableOpacity>
        </View>
        {meal.visible && (
        <View>
        <View style={styles.middleLine}>
            <View style={styles.middleBlock}>
                <Text style={styles.middleBlockText}>
                    {filterFunctionForTotalProteinCount(meal.id)} Б
                </Text>
            </View>
            <View style={[styles.middleBlock, {marginHorizontal: wp(10)}]}>
                <Text style={styles.middleBlockText}>
                {filterFunctionForTotalFatsCount(meal.id)} Ж
                </Text>
            </View>
            <View style={styles.middleBlock}>
                <Text style={styles.middleBlockText}>
                {filterFunctionForTotalCarbohydratesCount(meal.id)} У
                </Text>
            </View>
            <View style={styles.middleBlockCalories}>
                <Text style={styles.titleText}>
                {filterFunctionForTotalCaloriesCount(meal.id)} ккал
                </Text>
            </View>
        </View>
        <Image source={require('../../assets/images/rectangle12.png')}
                style={{width: wp(91.8), height: hp(0.47), marginTop: hp(0.59), alignSelf: 'center'}}/>
        
        { filterFunctionToGetOnlyUniqueDishesByIdForCurrentMeal(meal.id).length > 0 && filterFunctionToGetOnlyUniqueDishesByIdForCurrentMeal(meal.id).map((ff) =>(
            <View style={styles.mealBlock} key={ff.id} >
            <View>
                <Image source={{uri: ff.dishPath}}
                    style={styles.image}/>
            </View>
            <View style={styles.dishBlock}>
                <View><Text style={styles.dishTitle}>{ff.dishName}</Text></View>
                <View style={{display: 'flex', flexDirection: 'row', marginBottom: 0, marginTop: 'auto'}}>
                    <View style={{width: wp(9.2), marginRight: wp(2.31)}}><Text style={[styles.dishInfo]}>К{ff.dishCalories}</Text></View>
                    <View style={{width: wp(9.2), marginRight: wp(2.31)}}><Text style={styles.dishInfo}>Б{ff.dishProtein}</Text></View>
                    <View style={{width: wp(9.2), marginRight: wp(2.31)}}><Text style={styles.dishInfo}>Ж{ff.dishFats}</Text></View>
                    <View style={{width: wp(9.2)}}><Text style={styles.dishInfo}>У{ff.dishCarbohydrates}</Text></View>
                </View>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', marginRight: 0, marginLeft: 'auto'}}>
                <TouchableOpacity style={styles.counterButton}>
                    <Image source={require('../../assets/images/counterMinus.png')}
                        style={styles.counterImage}/>
                </TouchableOpacity>
                <View style={{width: wp(6.13), alignItems: 'center', alignSelf: 'center'}}>
                    {console.log('ff', ff)}
                    <Text style={styles.counterText}>{countNumberOfDishesInAMeal(meal.id, ff)}</Text>
                </View>
                <TouchableOpacity style={styles.counterButton} onPress={() => addDishToCart(meal.id, ff)}>
                    <Image source={require('../../assets/images/counterPlus.png')}
                        style={styles.counterImage}/>
                </TouchableOpacity>
            </View>
        </View>
        ))}
        <TouchableOpacity onPress={() => addToEaten(meal.id)} style={globalStyles.mainButton}>
            <Text style={styles.buttonText}>Добавить в съеденное</Text>
        </TouchableOpacity>
        </View>)}
    </View>))}
    </ScrollView>
  )
}

/*
<Image source={require('../../assets/images/picture_1.jpg')}
                style={styles.image}/>
                <Text>h</Text>
            <View style={styles.dishBlock}>
                <View><Text>Название блюда</Text></View>
                <View>
                    <Text>hggh</Text>
                </View>
            </View>
*/

const styles = StyleSheet.create({
    mealInvisible: {
        height: hp(9.01),
        width: wp(91.8),
        marginTop: hp(2.37),
        backgroundColor: colors.white,
        borderRadius: hp(1.54),
        alignSelf: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.18)',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowRadius: hp(2.13),
        shadowOpacity: 1,
    },
    topLine: {
        width: wp(91.8),
        marginTop: hp(2.78),
        height: hp(2.37),
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    titleText: {
        fontSize: RFValue(17, height),
        fontFamily: 'SF-Pro-Bold',
        lineHeight: hp(2.4),
    },
    arrowButton: {
        marginRight: 0,
        marginLeft: 'auto',
        alignSelf: 'center',
        justifyContent: 'center',
        height: hp(2.98),
        width: wp(7),
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
        width: wp(13.5),
    },
    middleBlockCalories: {
        width: wp(22),
        marginLeft: 'auto',
        marginRight: 0,
    },
    middleBlockText: {
        fontSize: RFValue(18, height),
        fontFamily: 'SF-Pro-Regular',
        lineHeight: hp(2.58),
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

})