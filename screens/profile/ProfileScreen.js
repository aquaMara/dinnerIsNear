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

const { height } = Dimensions.get('screen');

export default function ProfileScreen() {

    const [dayStatisticsVisible, setDayStatisticsVisible] = useState(false);
    const [caloriesAmount, setCaloriesAmount] = useState(1100);
    const [proteinAmount, setProteinAmount] = useState(90);
    const [fatsAmount, setFatsAmount] = useState(60);
    const [carbohydratesAmount, setCarbohydratesAmount] = useState(60);

    const [caloriesEaten, setCaloriesEaten] = useState(600);
    const [proteinEaten, setProteinEaten] = useState(90);
    const [fatsEaten, setFatsEaten] = useState(30);
    const [carbohydratesEaten, setCarbohydratesEaten] = useState(80);
    let h = 91.8;
    let h2 = 91.8 * 0.6;


    const countColourPercentage = (eaten, amount) => {
        let percentageOfEatenFromAmount = eaten / amount;
        let innerStatisticsBlockWidth = 74.1;
        let outerStatisticsBlockWidth = 91.8;
        let percentageOfSmallBlockWidth = percentageOfEatenFromAmount * innerStatisticsBlockWidth;
        console.log('eaten: ', eaten, ' amount: ', amount, ' percentageOfEatenFromAmount: ', percentageOfEatenFromAmount);
        console.log('percentageOfSmallBlockWidth', percentageOfSmallBlockWidth);
        if (percentageOfSmallBlockWidth > outerStatisticsBlockWidth) {
            percentageOfSmallBlockWidth = outerStatisticsBlockWidth;
        }
        return percentageOfSmallBlockWidth;
    }

    const countBackgroundColour = (eaten, amount) => {
        let percentageOfEatenFromAmount = eaten * 100 / amount;
        let bgColor = colors.red;
        console.log('percentageOfEatenFromAmount ', percentageOfEatenFromAmount);
        if (percentageOfEatenFromAmount <= 39 || percentageOfEatenFromAmount > 100) {
            bgColor = colors.red;
        } else if (percentageOfEatenFromAmount <= 69) {
            bgColor = colors.yellow;
        } else if (percentageOfEatenFromAmount <= 99) {
            bgColor = colors.green;
        } else {
            bgColor = colors.darkGreen;
        }
        console.log('bgColor: ', bgColor);
        return bgColor;
    }

    useEffect(() => {
        
    console.log(h, h2);
    }, [])

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
      });
    
      if (!fontsLoaded) {
        return null;
      }
      
  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
        <View style={styles.nameBlock}>
            <Text style={[styles.titleText, styles.regular]}>Фамилия Имя</Text>
        </View>
        <SignsBlock />
        <View style={styles.topLineBlock}>
            <Text style={[styles.regularText, styles.leftAlign]}>Показатели</Text>
        </View>
        {!dayStatisticsVisible && (
        <View style={styles.block}>
            <View style={styles.smallBlock}>
                <Text style={[styles.titleText, styles.medium]}>За день</Text>
                <TouchableOpacity style={styles.arrowButton} onPress={() => setDayStatisticsVisible(true)}>
                    <Image source={require('../../assets/images/chevronUp.png')}
                        style={styles.arrowImage}/>
                </TouchableOpacity>
            </View>
        </View>
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
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countColourPercentage(caloriesEaten, caloriesAmount)), backgroundColor: countBackgroundColour(caloriesEaten, caloriesAmount)}]}>
                            <Text style={styles.statisticsText}>Калории</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{caloriesAmount}</Text>
                    </View>
                </View>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countColourPercentage(proteinEaten, proteinAmount)), backgroundColor: countBackgroundColour(proteinEaten, proteinAmount)}]}>
                            <Text style={styles.statisticsText}>Белки</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{proteinAmount}</Text>
                    </View>
                </View>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countColourPercentage(fatsEaten, fatsAmount)), backgroundColor: countBackgroundColour(fatsEaten, fatsAmount)}]}>
                            <Text style={styles.statisticsText}>Жиры</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{fatsAmount}</Text>
                    </View>
                </View>
                <View style={styles.outerStatisticsBlock}>
                    <View style={styles.innerStatisticsBlock}>
                        <View style={[styles.statisticsResultBlock, 
                            {width: wp(countColourPercentage(carbohydratesEaten, carbohydratesAmount)), backgroundColor: countBackgroundColour(carbohydratesEaten, carbohydratesAmount)}]}>
                            <Text style={styles.statisticsText}>Углеводы</Text>
                        </View>                    
                    </View>
                    <View style={styles.innerStatisticsTextBlock}>
                        <Text style={[styles.regularText, styles.rightAlign]}>{carbohydratesAmount}</Text>
                    </View>
                </View>

            </View>
        </View>
        )}

        <View style={[styles.block, {marginBottom: hp(2.13),}]}>
            <View style={styles.smallBlock}>
                <Text style={[styles.titleText, styles.medium]}>За 11 дней</Text>
                <TouchableOpacity style={styles.arrowButton}>
                    <Image source={require('../../assets/images/chevronUp.png')}
                        style={styles.arrowImage}/>
                </TouchableOpacity>
            </View>
        </View>

        
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
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowColor: colors.black,
        shadowRadius: wp(2.05),
        shadowOpacity: 0.15,
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
        shadowOffset: {width: wp(0), height: hp(0.36)},
        shadowRadius: hp(0.95),
        shadowOpacity: 0.15,
        justifyContent: 'center'
    },
    statisticsText: {
        fontFamily: 'SF-Pro-Regular',
        fontSize: RFValue(15, height),
        lineHeight: hp(2.12),
        color: colors.white,
        marginLeft: wp(4.87),
    },
    

})