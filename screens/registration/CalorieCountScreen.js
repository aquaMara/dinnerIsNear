import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { globalStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuth } from '../../auth/AuthProvoder';
import * as SecureStore from 'expo-secure-store';

const { height } = Dimensions.get('screen');

export default function Screen({ navigation, route }) {

  const { calories } = useAuth();
  
  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }  
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={[styles.intakeInfo, {color: '#000'}]}>Ваша норма:</Text>
        <Text style={styles.intake}>{calories} ккал</Text>
      </View>
      <View style={styles.intakeInfoBox}>
        <Text style={[styles.intakeInfo, {color: '#6D6D72'} ]}>
        Мы рассчитали вашу норму макро- и микро-элементов и готовы приступить к работе.</Text>        
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('MapMe')}
        style={[globalStyles.mainButton, {marginTop: hp(28.9)} ]}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  intake: {
    fontSize: RFValue(34, height),
    fontFamily: 'SF-Pro-Bold',
    textAlign: 'center'
  },
  intakeInfo: {
    fontSize: RFValue(15, height),
    fontFamily: 'SF-Pro-Regular',
    lineHeight: hp(2.12),
    alignSelf: 'center',
    textAlign: 'center',
    color: colors.black,
  },
  intakeInfoBox:{
    color: colors.grey,
    marginTop: hp(1.54),
    height: hp(6.4),
    width: wp(58.98)
  },
  titleBox: {
    width: wp(66.67),
    marginTop: hp(43.48),
    marginTop: hp(37.9),
    height: hp(7),
    //marginBottom: hp(7.1),
    //lineHeight: hp(4.74),
  },
  buttonText: { // 600
    color: colors.white,
    fontSize: RFValue(17, height),
    lineHeight: hp(2.4),
    fontFamily: 'SF-Pro-Medium',
    textAlign: 'center',
  }
})