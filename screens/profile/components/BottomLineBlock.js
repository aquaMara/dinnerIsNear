import { ScrollView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import { globalStyles } from '../../../styles/styles';

const { height } = Dimensions.get('screen');

export default function BottomLineBlock() {

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
  });
    
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
        <View style={styles.bottomLineBlock}>
            <Text style={styles.regularText}>Профиль</Text>
        </View>
        <TouchableOpacity style={globalStyles.whiteButton}>
            <Text style={[styles.buttonText, styles.greenText]}>Настройка профиля</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.mainButton, styles.bottomButton]}>
            <Text style={[styles.buttonText, styles.whiteText]}>Настройка профиля PRO</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    bottomLineBlock: {
        width: wp(92.31),
        marginVertical: hp(1.54),
        alignSelf: 'center',
    },
    regularText: {
        fontFamily: 'SF-Pro-Regular',
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        color: colors.grey,
        textAlign: 'left'
    },
    buttonText: {
        fontFamily: 'SF-Pro-Bold',
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
    },
    greenText: {
        color: colors.green,
    },
    whiteText: {
        color: colors.white,
    },
    bottomButton: {
        marginVertical: hp(1.54),
    }
})