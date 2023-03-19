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
import * as SecureStore from 'expo-secure-store';

const { height } = Dimensions.get('screen');

export default function ProfileScreen() {

    const [dayStatisticsVisible, setDayStatisticsVisible] = useState(false);
    const [elevenDaysStatisticsVisible, setElevenDaysStatisticsVisible] = useState(false);
    
    // Stable values for every day
    const {name, calories, protein, fats, carbohydrates} = useAuth();
    const [todayCalories, setTodayCalories] = useState(0);
    const [todayProtein, setTodayProtein] = useState(0);
    const [todayFats, setTodayFats] = useState(0);
    const [todayCarbohydrates, setTodayCarbohydrates] = useState(0);
    const [elevenDaysAverageCalories, setElevenDaysAverageCalories] = useState(0);
    const [elevenDaysAverageProtein, setElevenDaysAverageProtein] = useState(0);
    const [elevenDaysAverageFats, setElevenDaysAverageFats] = useState(0);
    const [elevenDaysAverageCarbohydrates, setElevenDaysAverageCarbohydrates] = useState(0);

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

    const FormatDate = (date) => {
        var mm = date.getMonth() + 1;
        return date.getFullYear() + '-' + mm + '-' + date.getDate();
    }

    const getTodayStatistics = async () => {
        const today = FormatDate(new Date())
        const data = await SecureStore.getItemAsync(today);
        const eatenToday = JSON.parse(data);
        if (eatenToday) {
            countNutrition(eatenToday);
        }
        setDayStatisticsVisible(true);
    }

    const countNutrition = (eatenToday) => {
        let tcl = 0, tp = 0, tf = 0, tc = 0;
        for (let i = 0; i < eatenToday.length; i++) {
            tcl += eatenToday[i].totalCalories;
        }
        setTodayCalories(tcl);
        for (let i = 0; i < eatenToday.length; i++) {
            tp += eatenToday[i].totalProtein;
        }
        setTodayProtein(tp);
        for (let i = 0; i < eatenToday.length; i++) {
            tf += eatenToday[i].totalFats;
        }
        setTodayFats(tf);
        for (let i = 0; i < eatenToday.length; i++) {
            tc += eatenToday[i].totalCarbohydrates;
        }
        setTodayCarbohydrates(tc);
    }

    const getElevenDaysStatistics = async () => {
        let date = new Date();
        let key = FormatDate(date);
        let eaten = [];
        let elevenCal = 0, elevenProt = 0, elevenFats = 0, elevenCarb = 0;
        let daysCounter = 0;
        // 1
        const data = await SecureStore.getItemAsync(key);
        if (data) {
            eaten = JSON.parse(data);
            for (let i = 0; i < eaten.length; i++) {
                elevenCal += eaten[i].totalCalories;
                elevenProt += eaten[i].totalProtein;
                elevenFats += eaten[i].totalFats;
                elevenCarb += eaten[i].totalCarbohydrates;
            }
            daysCounter++;
        }
        // 2
        for (let i = 0; i < 10; i++) {
            date.setDate(date.getDate() - 1);
            key = FormatDate(date);
            const data = await SecureStore.getItemAsync(key);
            if (data) {
                eaten = JSON.parse(data);
                for (let i = 0; i < eaten.length; i++) {
                    elevenCal += eaten[i].totalCalories;
                    elevenProt += eaten[i].totalProtein;
                    elevenFats += eaten[i].totalFats;
                    elevenCarb += eaten[i].totalCarbohydrates;
                }
                daysCounter++;
            }
        }
        setElevenDaysAverageCalories(isNaN(parseInt(elevenCal / daysCounter, 10)) ? 0 : parseInt(elevenCal / daysCounter, 10));
        setElevenDaysAverageProtein(isNaN(parseInt(elevenProt / daysCounter, 10)) ? 0 : parseInt(elevenProt / daysCounter, 10));
        setElevenDaysAverageFats(isNaN(parseInt(elevenFats / daysCounter, 10)) ? 0 : parseInt(elevenFats / daysCounter, 10));
        setElevenDaysAverageCarbohydrates(isNaN(parseInt(elevenCarb / daysCounter, 10)) ? 0 : parseInt(elevenCarb / daysCounter, 10));
        setElevenDaysStatisticsVisible(true);
    }

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
    });
    
    if (!fontsLoaded) {
      return null;
    }
      
  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.white}} >
        <View style={styles.nameBlock}>
            <Text style={[styles.titleText, styles.regular]}>{name}</Text>
        </View>
        <SignsBlock />
        <View style={styles.topLineBlock}>
            <Text style={[styles.regularText, styles.leftAlign]}>Показатели</Text>
        </View>
        {!dayStatisticsVisible && (
        <TouchableOpacity style={styles.block} onPress={() => getTodayStatistics()}>
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
                            {width: wp(countColourPercentage(todayCalories, calories)),
                            backgroundColor: countBackgroundColour(todayCalories, calories)}]}>
                            <Text style={styles.statisticsText}>Калории</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{todayCalories}</Text>
                    </View>
                </View>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <Text style={styles.statisticsText}>Белки</Text>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countColourPercentage(todayProtein, protein)),
                            backgroundColor: countBackgroundColour(todayProtein, protein)}]}>
                            <Text style={styles.statisticsText}>Белки</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{todayProtein}</Text>
                    </View>
                </View>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <Text style={styles.statisticsText}>Жиры</Text>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countColourPercentage(todayFats, fats)),
                            backgroundColor: countBackgroundColour(todayFats, fats)}]}>
                            <Text style={styles.statisticsText}>Жиры</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{todayFats}</Text>
                    </View>
                </View>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <Text style={styles.statisticsText}>Углеводы</Text>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countColourPercentage(todayCarbohydrates, carbohydrates)),
                            backgroundColor: countBackgroundColour(todayCarbohydrates, carbohydrates)}]}>
                            <Text style={styles.statisticsText}>Углеводы</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{todayCarbohydrates}</Text>
                    </View>
                </View>

            </View>
        </View>
        )}

        {!elevenDaysStatisticsVisible && (
        <TouchableOpacity style={[styles.block, {marginBottom: hp(2.13),}]} onPress={() => getElevenDaysStatistics()}>
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
                            {width: wp(countColourPercentage(elevenDaysAverageCalories, calories)),
                            backgroundColor: countBackgroundColour(elevenDaysAverageCalories, calories)}]}>
                            <Text style={styles.statisticsText}>Калории</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{elevenDaysAverageCalories}</Text>
                    </View>
                </View>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <Text style={styles.statisticsText}>Белки</Text>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countColourPercentage(elevenDaysAverageProtein, protein)),
                            backgroundColor: countBackgroundColour(elevenDaysAverageProtein, protein)}]}>
                            <Text style={styles.statisticsText}>Белки</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{elevenDaysAverageProtein}</Text>
                    </View>
                </View>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <Text style={styles.statisticsText}>Жиры</Text>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countColourPercentage(elevenDaysAverageFats, fats)),
                            backgroundColor: countBackgroundColour(elevenDaysAverageFats, fats)}]}>
                            <Text style={styles.statisticsText}>Жиры</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{elevenDaysAverageFats}</Text>
                    </View>
                </View>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <Text style={styles.statisticsText}>Углеводы</Text>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countColourPercentage(elevenDaysAverageCarbohydrates, carbohydrates)),
                            backgroundColor: countBackgroundColour(elevenDaysAverageCarbohydrates, carbohydrates)}]}>
                            <Text style={styles.statisticsText}>Углеводы</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{elevenDaysAverageCarbohydrates}</Text>
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