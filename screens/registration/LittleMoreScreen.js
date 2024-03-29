import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { globalStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import checkSecureStore from '../../functions/checkSecureStore';

const { height } = Dimensions.get('screen');

export default function LittleMoreScreen({ route, navigation }) {
  
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
        <Text style={styles.title}>Ещё немного!</Text>
      </View>
      <View style={styles.conditionBox}>
        <Text style={styles.bodyText}>Нобходимо ввести некоторые данные о тебе и выбрать параметры сортировки блюд,
         чтобы мы смогли представить тебе сбалансированные блюда.</Text>        
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('StepOne')}
        style={[globalStyles.mainButton, styles.buttonRegular]}>
        <Text style={styles.buttonText}>Настроить профиль</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
//() => navigation.navigate('StepOne')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  titleBox: {
    width: wp(66.67),
    marginTop: hp(33.17),
  },
  title: {
    lineHeight: hp(4.74),
    fontSize: RFValue(34, height),
    fontFamily: 'SF-Pro-Bold',
    textAlign: 'center',
  },
  conditionBox:{
    width: wp(70.7),
    height: hp(10.53),
    marginTop: hp(1.06),
  },
  bodyText: {
    fontSize: RFValue(15, height),
    lineHeight: hp(2.12),
    fontFamily: 'SF-Pro-Regular',
    textAlign: 'center',
    color: colors.black,
    opacity: 0.6
  },
  buttonRegular: {
    marginTop: hp(32.11),
    marginBottom: hp(5.57)
  },
  buttonText: {
    color: '#fff',
    fontSize: RFValue(17, height),
    lineHeight: hp(2.4),
    fontFamily: 'SF-Pro-Medium',
    textAlign: 'center',
  }
})