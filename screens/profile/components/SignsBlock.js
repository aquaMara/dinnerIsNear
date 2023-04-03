import { ScrollView, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../../../auth/AuthProvoder';
import { useState, useEffect } from 'react';

const { height } = Dimensions.get('screen');

export default function SignsBlock() {

    const {name, calories, protein, fats, carbohydrates} = useAuth();
    const [elevenDaysCaloriesDifference, setElevenDaysCaloriesDifference] = useState(0);
    const [elevenDaysProteinDifference, setElevenDaysProteinDifference] = useState(0);
    const [elevenDaysFatsDifference, setElevenDaysFatsDifference] = useState(0);

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

    const countBackgroundColour = (eaten) => {
        let bgColor = colors.red;
        console.log(eaten)
        if (eaten < 5 && eaten > - 5) {
            bgColor = colors.darkGreen;
        } else if (eaten < 10 && eaten > - 10) {
            bgColor = colors.green;
        } else if (eaten < 20 && eaten > - 20) {
            bgColor = colors.yellow;
        } else if (eaten >= 20 && eaten > - 30) {
            bgColor = colors.red;
        } else {
            bgColor = colors.red;
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
        let ElevenDaysAverageCalories = isNaN(parseInt(elevenCal / daysCounter, 10)) ? 0 : parseInt(elevenCal / daysCounter, 10);
        let ElevenDaysAverageProtein = isNaN(parseInt(elevenProt / daysCounter, 10)) ? 0 : parseInt(elevenProt / daysCounter, 10);
        let ElevenDaysAverageFats = isNaN(parseInt(elevenFats / daysCounter, 10)) ? 0 : parseInt(elevenFats / daysCounter, 10);

        setElevenDaysCaloriesDifference(isNaN(parseInt(ElevenDaysAverageCalories * 100 / calories - 100, 10)) 
            ? 0 : parseInt(ElevenDaysAverageCalories * 100 / calories - 100, 10));

        setElevenDaysFatsDifference(isNaN(parseInt(ElevenDaysAverageFats * 100 / fats - 100, 10)) 
            ? 0 : parseInt(ElevenDaysAverageFats * 100 / fats - 100, 10));

        setElevenDaysProteinDifference(isNaN(parseInt(ElevenDaysAverageProtein * 100 / protein - 100, 10)) 
            ? 0 : parseInt(ElevenDaysAverageProtein * 100 / protein - 100, 10));
        
    }

    useEffect(() => {
      getElevenDaysStatistics();
    }, [])
    

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
    });
    
    if (!fontsLoaded) {
        return null;
    }

  return (
    <View style={styles.signsBlock}>
        <View style={styles.signBlock}>
            <View style={[styles.circleBlock, {backgroundColor: countBackgroundColour(elevenDaysCaloriesDifference)}]}>
                <Image source={require('../../../assets/images/medal-star.png')}
                    style={styles.circleImage}/>
                    <Text style={[styles.titleBoldText, {color: colors.white, marginTop: hp(0.78)}]}>{elevenDaysCaloriesDifference}%</Text>
            </View>
            <Text style={[styles.titleBoldText, {color: colors.grey}]}>Калории</Text>
        </View>
        <View style={styles.signBlock}>
            <View style={[styles.circleBlock, {backgroundColor: countBackgroundColour(elevenDaysFatsDifference)}]}>
                <Image source={require('../../../assets/images/medal-star.png')}
                    style={styles.circleImage}/>
                    <Text style={[styles.titleBoldText, {color: colors.white, marginTop: hp(0.78)}]}>{elevenDaysFatsDifference}%</Text>
            </View>
            <Text style={[styles.titleBoldText, {color: colors.grey}]}>Жиры</Text>
        </View>
        <View style={styles.signBlock}>
            <View style={[styles.circleBlock, {backgroundColor: countBackgroundColour(elevenDaysProteinDifference)}]}>
                <Image source={require('../../../assets/images/medal-star.png')}
                    style={styles.circleImage}/>
                    <Text style={[styles.titleBoldText, {color: colors.white, marginTop: hp(0.78)}]}>{elevenDaysProteinDifference}%</Text>
            </View>
            <Text style={[styles.titleBoldText, {color: colors.grey}]}>Белки</Text>
        </View>

     </View>
  )
}

const styles = StyleSheet.create({
    signsBlock: {
        height: hp(13.63),
        width: wp(90.26),
        marginTop: hp(2.84),
        marginBottom: hp(2.49),
        backgroundColor: colors.white,
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    signBlock: {
        height: hp(13.63),
        width: wp(23.08),
        borderColor: 'green',
        alignItems: 'center',
    },
    circleBlock: {
        width: wp(23.08),
        height: hp(10.67),
        borderRadius: wp(69.74),
        aspectRatio: 1,    
        shadowColor: colors.black,
        shadowOffset: {width: wp(0), height: hp(0.36)},
        shadowRadius: hp(0.95),
        shadowOpacity: 0.15,
        alignItems: 'center'
    },
    circleImage: {
        height: hp(4.74),
        width: wp(10.26),
        marginTop: hp(2.42),
    },
    titleBoldText: {
        fontFamily: 'SF-Pro-Bold',
        fontSize: RFValue(11, height),
        lineHeight: hp(1.56),
        color: colors.grey,
        marginTop: 'auto',
        marginBottom: 0
    },
    goodResultColor: {
        backgroundColor: colors.green,
    },
    badResultColor: {
        backgroundColor: colors.red,
    },
})