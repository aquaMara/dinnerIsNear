import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuth } from '../../../auth/AuthProvoder';
import * as SecureStore from 'expo-secure-store';
import { countCaloriesInCart } from '../../../functions_secure_store/Cart';

const { height } = Dimensions.get('screen');

export default function ShoppingCartMiddleLine({ id }) {

    const { caloriesCount, proteinCount, fatsCount, carbohydratesCount } = useAuth();

    const countMealCalories = (id) => {
        var caloriesForThisMealFromGlobal = caloriesCount.filter(obj => {
            return obj.mealId === id
        })
        let totalCalories = 0;
        caloriesForThisMealFromGlobal.forEach(element => {
            console.log(element, 'element')
            totalCalories += element.totalCalories;
        });
        return totalCalories;
    }
    const countMealProtein = (id) => {
        var proteinForThisMealFromGlobal = proteinCount.filter(obj => {
            return obj.mealId === id
        });
        let totalProtein = 0;
        proteinForThisMealFromGlobal.forEach(element => {
            totalProtein += element.totalProtein;
        });
        return totalProtein;
    }
    const countMealFats = (id) => {
        var fatsForThisMealFromGlobal = fatsCount.filter(obj => {
            return obj.mealId === id
        });
        let  totalFats = 0;
        fatsForThisMealFromGlobal.forEach(element => {
            totalFats += element.totalFats;
        });
        return totalFats;
    }
    const countMealCarbohydrates = (id) => {
        var carbohydratesForThisMealFromGlobal = carbohydratesCount.filter(obj => {
            return obj.mealId === id
        });
        let totalCarbohydrates = 0;
        carbohydratesForThisMealFromGlobal.forEach(element => {
            totalCarbohydrates += element.totalCarbohydrates;
        });
        return totalCarbohydrates;
    }

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
    });

    if (!fontsLoaded) {
        return null;
    }
    

    useEffect(() => {
        countCaloriesInCart(cart, id);
    }, [])

  return (
    <View>
    <View style={styles.middleLine}>
            <View style={styles.middleBlock}>
                <Text style={styles.middleBlockText}>
                    {countMealProtein(id)} Б
                </Text>
            </View>
            <View style={[styles.middleBlock, {marginHorizontal: wp(10)}]}>
                <Text style={styles.middleBlockText}>
                {countMealFats(id)} Ж
                </Text>
            </View>
            <View style={styles.middleBlock}>
                <Text style={styles.middleBlockText}>
                {countMealCarbohydrates(id)} У
                </Text>
            </View>
            <View style={styles.middleBlockCalories}>
                <Text style={styles.titleText}>
                {countMealCalories(id)} ккал
                </Text>
            </View>
            
        </View>
        <Image source={require('../../../assets/images/rectangle12.png')}
        style={{width: wp(91.8), height: hp(0.47), marginTop: hp(0.59), alignSelf: 'center'}}/>
    </View>
  )
}

const styles = StyleSheet.create({
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
    titleText: {
        fontSize: RFValue(17, height),
        fontFamily: 'SF-Pro-Bold',
        lineHeight: hp(2.4),
    },
})