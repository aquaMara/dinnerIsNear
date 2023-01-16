import { ScrollView, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../styles/colors';
import SignsBlock from './components/SignsBlock';
import BottomLineBlock from './components/BottomLineBlock';
import MiddleLineBlock from './components/MiddleLineBlock';

const { height } = Dimensions.get('screen');

export default function ProfileScreen() {

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
            <Text style={styles.regularText}>Показатели</Text>
        </View>
        <MiddleLineBlock />
        <BottomLineBlock />
        
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    nameBlock: {
        height: hp(4.27),
        width: wp(100),
        borderWidth: 0.4,
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
    },
    regularText: {
        fontFamily: 'SF-Pro-Regular',
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        color: colors.grey,
        textAlign: 'left'
    },
    topLineBlock: {
        width: wp(92.31),
        marginTop: hp(2.49),
        marginBottom: hp(2.13),
        alignSelf: 'center',
        borderWidth: 0.3,
    },
    block: {
        width: wp(91.79),
        marginTop: hp(1.54),
        backgroundColor: colors.white,
        borderRadius: wp(5.13),
        alignSelf: 'center',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowColor: colors.black,
        shadowRadius: wp(2.05),
        shadowOpacity: 0.18,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
    

})