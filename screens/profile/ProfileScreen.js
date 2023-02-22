import { ScrollView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../styles/colors';
import SignsBlock from './components/SignsBlock';
import BottomLineBlock from './components/BottomLineBlock';
import MiddleLineBlock from './components/MiddleLineBlock';
import { useAuth } from '../../auth/AuthProvoder';

const { height } = Dimensions.get('screen');

import firebase from 'firebase/compat';
import { RefreshControl } from 'react-native';

export default function ProfileScreen() {

    const [dayStatisticsVisible, setDayStatisticsVisible] = useState(true);
    const [elevenDaysStatisticsVisible, setElevenDaysStatisticsVisible] = useState(false);

    const {name, setName} = useAuth();
    // Stable values for every day
    const {calories, setCalories} = useAuth();
    const {protein, setProtein} = useAuth();
    const {fats, setFats} = useAuth();
    const {carbohydrates, setCarbohydrates} = useAuth();
    // Eaten this day
    const {caloriesCount, setCaloriesCount} = useAuth();
    const {proteinCount, setProteinCount} = useAuth();
    const {fatsCount, setFatsCount} = useAuth();
    const {carbohydratesCount, setCarbohydratesCount} = useAuth();
    // Eaten this day
    const [caloriesCountFb, setCaloriesCountFb] = useState(0);
    const [proteinCountFb, setProteinCountFb] = useState(0);
    const [fatsCountFb, setFatsCountFb] = useState(0);
    const [carbohydratesCountFb, setCarbohydratesCountFb] = useState(0);

    const countCaloriesEaten = () => {
        let eatenCalories = 0;
        caloriesCount.forEach(element => {
            if (Object.keys(element).length > 0) {
                eatenCalories += element.totalCalories;
            }
        });
        return eatenCalories;
    }
    const countCaloriesWidth = () => {
        const eatenCalories = countCaloriesEaten();
        return countColourPercentage(eatenCalories, calories);
    }
    const countCaloriesColor = () => {
        const eatenCalories = countCaloriesEaten();
        return countBackgroundColour(eatenCalories, calories);
    }
    const countProteinEaten = () => {
        let eatenProtein = 0;
        proteinCount.forEach(element => {
            if (Object.keys(element).length > 0) {
                eatenProtein += element.totalProtein;
            }
        });
        return eatenProtein;
    }
    const countProteinWidth = () => {
        const eatenProtein = countProteinEaten();
        return countColourPercentage(eatenProtein, protein);
    }
    const countProteinColor = () => {
        const eatenProtein = countProteinEaten();
        return countBackgroundColour(eatenProtein, protein);
    }

    const countFatsEaten = () => {
        let eatenFats = 0;
        fatsCount.forEach(element => {
            if (Object.keys(element).length > 0) {
                eatenFats += element.totalFats;
            }
        });
        return eatenFats;
    }
    const countFatsWidth = () => {
        const eatenFats = countFatsEaten();
        return countColourPercentage(eatenFats, fats);
    }
    const countFatsColor = () => {
        const eatenFats = countFatsEaten();
        return countBackgroundColour(eatenFats, fats);
    }

    const countCarbohydratesEaten = () => {
        let eatenCarbohydrates = 0;
        carbohydratesCount.forEach(element => {
            if (Object.keys(element).length > 0) {
                eatenCarbohydrates += element.totalCarbohydrates;
            }
        });
        return eatenCarbohydrates;
    }
    const countCarbohydratesWidth = () => {
        const eatenCarbohydrates = countCarbohydratesEaten();
        return countColourPercentage(eatenCarbohydrates, carbohydrates);
    }
    const countCarbohydratesColor = () => {
        const eatenCarbohydrates = countCarbohydratesEaten();
        return countBackgroundColour(eatenCarbohydrates, carbohydrates);
    }

    const countColourPercentage = (eaten, amount) => {
        let percentageOfEatenFromAmount = eaten / amount;
        let innerStatisticsBlockWidth = 74.1;
        let outerStatisticsBlockWidth = 91.8;
        let percentageOfSmallBlockWidth = percentageOfEatenFromAmount * innerStatisticsBlockWidth;
        if (percentageOfSmallBlockWidth > outerStatisticsBlockWidth) {
            percentageOfSmallBlockWidth = outerStatisticsBlockWidth;
        }
        return isNaN(percentageOfSmallBlockWidth) ? 0 : percentageOfSmallBlockWidth;
    }

    const countBackgroundColour = (eaten, amount) => {
        let percentageOfEatenFromAmount = eaten * 100 / amount;
        let bgColor = colors.red;
        if (percentageOfEatenFromAmount <= 39 || percentageOfEatenFromAmount > 100) {
            bgColor = colors.red;
        } else if (percentageOfEatenFromAmount <= 69) {
            bgColor = colors.yellow;
        } else if (percentageOfEatenFromAmount <= 99) {
            bgColor = colors.green;
        } else {
            bgColor = colors.darkGreen;
        }
        return bgColor;
    }

        // do that in cart block after a user bought something
    const getEatenFromFirebase = async () => {
        const userId = 'LAS3S528apZ5J627SwEfsIn6oke2';
        let caloriesFb = 0, proteinFb = 0, fatsFb = 0, carbohydratesFb = 0;
        await firebase.firestore().collection('today').doc(userId)
            .get().then((snapshot) => {
                if (snapshot.exists) {
                    let arrayOfMealsWithCalories = Object.values(snapshot.data())
                    console.log(arrayOfMealsWithCalories.length)
                    for (let i = 0; i < arrayOfMealsWithCalories.length; i++) {
                        caloriesFb += arrayOfMealsWithCalories[i].totalCalories;
                        proteinFb += arrayOfMealsWithCalories[i].totalProtein;
                        fatsFb += arrayOfMealsWithCalories[i].totalFats;
                        carbohydratesFb += arrayOfMealsWithCalories[i].totalCarbohydrates;
                    }
                    setCaloriesCountFb(() => caloriesFb);
                    //setCaloriesCount(caloriesFb)
                    setProteinCountFb(proteinFb);
                    setFatsCountFb(fatsFb);
                    setCarbohydratesCountFb(carbohydratesFb);
                    console.log(caloriesFb, caloriesCountFb, proteinCountFb, fatsCountFb, caloriesCountFb, 'hhh');
                    console.log(caloriesFb, proteinFb, fatsFb, carbohydratesFb)
                    //return {caloriesFb, proteinFb, fatsFb, carbohydratesFb};
                    return {caloriesFb, proteinFb, fatsFb, carbohydratesFb};
                }
            });
    }

    const setData = async () => {
        const x = await getEatenFromFirebase();
        console.log('xxx', x)
        //const {caloriesFb, proteinFb, fatsFb, carbohydratesFb} = getEatenFromFirebase();
        //console.log(caloriesFb, proteinFb, fatsFb, carbohydratesFb)
    }

    
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = () => {
      setRefreshing(true);
      setData();
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }

    useEffect(() => {
        setData();
    }, [caloriesCountFb]);

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
      });
    
      if (!fontsLoaded) {
        return null;
      }
      
  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.white}} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={styles.nameBlock}>
            <Text style={[styles.titleText, styles.regular]}>{name}</Text>
        </View>
        <SignsBlock />
        <View style={styles.topLineBlock}>
            <Text style={[styles.regularText, styles.leftAlign]}>Показатели</Text>
        </View>
        {!dayStatisticsVisible && (
        <TouchableOpacity style={styles.block} onPress={() => setDayStatisticsVisible(true)}>
            <View style={styles.smallBlock}>
                <Text style={[styles.titleText, styles.medium]}>За день</Text>
                <View style={styles.arrowButton}>
                    <Image source={require('../../assets/images/chevronUp.png')}
                        style={styles.arrowImage}/>
                </View>
            </View>
        </TouchableOpacity>
        )}
        {dayStatisticsVisible && (
        <View style={{}}>
            <View style={[styles.smallBlock, styles.smallBlockStatistics]}>
                <Text style={[styles.titleText, styles.medium]}>За день</Text>
                <TouchableOpacity style={styles.arrowButton} onPress={() => setDayStatisticsVisible(false)}>
                    <Image source={require('../../assets/images/leftChevron.png')}
                        style={styles.arrowImage}/>
                </TouchableOpacity>
            </View>
            <View style={styles.statisticsBlocks}>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <Text style={styles.statisticsText}>Калории</Text>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countCaloriesWidth()), backgroundColor: countCaloriesColor()}]}>
                            <Text style={styles.statisticsText}>Калории</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{countCaloriesEaten()}</Text>
                    </View>
                </View>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <Text style={styles.statisticsText}>Белки</Text>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countProteinWidth()), backgroundColor: countProteinColor()}]}>
                            <Text style={styles.statisticsText}>Белки</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{countProteinEaten()}</Text>
                    </View>
                </View>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <Text style={styles.statisticsText}>Жиры</Text>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countFatsWidth()), backgroundColor: countFatsColor()}]}>
                            <Text style={styles.statisticsText}>Жиры</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{countFatsEaten()}</Text>
                    </View>
                </View>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <Text style={styles.statisticsText}>Углеводы</Text>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countCarbohydratesWidth()), backgroundColor: countCarbohydratesColor()}]}>
                            <Text style={styles.statisticsText}>Углеводы</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{countCarbohydratesEaten()}</Text>
                    </View>
                </View>

            </View>
        </View>
        )}

        {!elevenDaysStatisticsVisible && (
        <TouchableOpacity style={[styles.block, {marginBottom: hp(2.13),}]} onPress={() => setElevenDaysStatisticsVisible(true)}>
            <View style={styles.smallBlock}>
                <Text style={[styles.titleText, styles.medium]}>За 11 дней</Text>
                <TouchableOpacity style={styles.arrowButton}>
                    <Image source={require('../../assets/images/chevronUp.png')}
                        style={styles.arrowImage}/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
        )}
        {elevenDaysStatisticsVisible && (
        <View style={{}}>
            <View style={[styles.smallBlock, styles.smallBlockStatistics]}>
                <Text style={[styles.titleText, styles.medium]}>За 11 дней</Text>
                <TouchableOpacity style={styles.arrowButton} onPress={() => setElevenDaysStatisticsVisible(false)}>
                    <Image source={require('../../assets/images/leftChevron.png')}
                        style={styles.arrowImage}/>
                </TouchableOpacity>
            </View>
            <View style={styles.statisticsBlocks}>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <Text style={styles.statisticsText}>Калории</Text>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countCaloriesWidth()), backgroundColor: countCaloriesColor()}]}>
                            <Text style={styles.statisticsText}>Калории</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{countCaloriesEaten()}</Text>
                    </View>
                </View>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <Text style={styles.statisticsText}>Белки</Text>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countProteinWidth()), backgroundColor: countProteinColor()}]}>
                            <Text style={styles.statisticsText}>Белки</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{countProteinEaten()}</Text>
                    </View>
                </View>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <Text style={styles.statisticsText}>Жиры</Text>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countFatsWidth()), backgroundColor: countFatsColor()}]}>
                            <Text style={styles.statisticsText}>Жиры</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{countFatsEaten()}</Text>
                    </View>
                </View>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <Text style={styles.statisticsText}>Углеводы</Text>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countCarbohydratesWidth()), backgroundColor: countCarbohydratesColor()}]}>
                            <Text style={styles.statisticsText}>Углеводы</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{countCarbohydratesEaten()}</Text>
                    </View>
                </View>

            </View>
        </View>
        )}
        
        <MiddleLineBlock />
        <BottomLineBlock />
    </ScrollView>
  )
}

/*
        <View style={{width: wp(h2), height: hp(2.61), borderWidth: 0.3, borderRadius: wp(6.15), backgroundColor: 'red'}}>

                    </View>
        */

const styles = StyleSheet.create({
    nameBlock: {
        height: hp(4.27),
        width: wp(100),
        justifyContent: 'flex-end'
    },
    titleText:  {
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        color: colors.black,
        textAlign: 'center',
    },
    regular: {
        fontFamily: 'SF-Pro-Regular',
    },
    medium: {
        fontFamily: 'SF-Pro-Medium',
        textAlign: 'left',
    },
    regularText: {
        fontFamily: 'SF-Pro-Regular',
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        color: colors.grey,
    },
    leftAlign: {
        textAlign: 'left',
    },
    rightAlign: {    
        textAlign: 'right',
    },
    topLineBlock: {
        width: wp(92.31),
        marginTop: hp(2.49),
        // marginBottom: hp(2.13),
        alignSelf: 'center',
    },
    block: {
        //height: hp(6.04),
        width: wp(91.79),
        marginTop: hp(2.13),
        backgroundColor: colors.white,
        borderRadius: wp(5.13),
        alignSelf: 'center',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowColor: colors.black,
        shadowRadius: wp(2.05),
        shadowOpacity: 0.18,
    },
    smallBlock: {
        height: hp(2.96),
        width: wp(85.13),
        marginTop: hp(1.54),
        marginBottom: hp(1.54),
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    smallBlockStatistics: {
        marginBottom: hp(0.95),
    },
    arrowButton: {
        width: wp(10.26),
        height: hp(2.96),
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowImage: {
        width: wp(5.11),
        height: hp(1.36),
    },
    statisticsBlocks: {
        width: wp(91.8),
        height: hp(14.57),
        alignSelf: 'center',
    },
    outerStatisticsBlock: {
        width: wp(91.8),
        height: hp(2.61),
        marginBottom: hp(1.07),
        borderRadius: wp(6.15),
        backgroundColor: colors.systemLight,
        display: 'flex',
        flexDirection: 'row',
    },
    innerStatisticsBlock: {
        width: wp(74.1),
        height: hp(2.13),
        borderRadius: wp(13.08),
        marginLeft: wp(0.24),
        backgroundColor: colors.grey3,
        marginVertical: hp(0.24),
    },
    innerStatisticsTextBlock: {
        width: wp(9.18),
        height: hp(2.13),
        marginVertical: hp(0.24),
        marginLeft: wp(5.38),
    },
    statisticsResultBlock: {
        height: hp(2.13),
        borderRadius: wp(13.08),
        shadowColor: colors.black,
        justifyContent: 'center',
        position: 'absolute',    
    },
    statisticsText: {
        fontFamily: 'SF-Pro-Regular',
        fontSize: RFValue(15, height),
        lineHeight: hp(2.12),
        color: colors.white,
        marginLeft: wp(4.87),
    },
    

})