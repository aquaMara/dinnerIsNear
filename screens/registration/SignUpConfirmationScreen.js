import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Keyboard } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { globalStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuth } from '../../auth/AuthProvoder';
import * as SecureStore from 'expo-secure-store';

const { height } = Dimensions.get('screen');

export default function SignUpConfirmationScreen({ route, navigation }) {

  const [code, setCode] = useState(null);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  
  const { setCalories, setProtein, setFats, setCarbohydrates, setName, setMealsCount } = useAuth();
 
  useEffect(() => {
    const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardShown(true);
    });
    const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardShown(false);
    });

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    }
  }, []);
  
  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const confirmCode = async () => {
    if (code.trim() != '123456') {
      Alert.alert(
        'Неверный код',
        'Ваш код 123456',
        [
          {
            text: 'OK',
            style: 'default',
          },
        ],
      );
    } else {
      //await SecureStore.deleteItemAsync('name');
      let name = await SecureStore.getItemAsync('name');
      if (name) {
        await getData();
        await cleanEatenMealsByDate();
        await cleanWeekTagsByDate();
        //navigation.navigate('Tab');
        navigation.navigate('MapMe');
      } else {
        await saveData();
        navigation.navigate('LittleMore');
      }
    }
  }

  const saveData = async () => {
    const phoneNumber = '+7' + route.params.phoneNumber;
    await SecureStore.setItemAsync('phoneNumber', phoneNumber);
    await SecureStore.setItemAsync('trueTags', JSON.stringify([]));
    await SecureStore.setItemAsync('trueProTags', JSON.stringify([]));
    await SecureStore.setItemAsync('weekTags', JSON.stringify([]));
  }

  const getData = async () => {
    let dayCalories = parseInt(await SecureStore.getItemAsync('dayCalories'));
    let dayProtein = parseInt(await SecureStore.getItemAsync('dayProtein'));
    let dayFats = parseInt(await SecureStore.getItemAsync('dayFats'));
    let dayCarbohydrates = parseInt(await SecureStore.getItemAsync('dayCarbohydrates'));
    let mealAmount = parseInt(await SecureStore.getItemAsync('mealAmount'));
    let name = await SecureStore.getItemAsync('name');

    let regime = await SecureStore.getItemAsync('regime');
    if (regime == 'period') {
      let dayCaloriesRegime = parseInt(await SecureStore.getItemAsync('dayCaloriesRegime'));
      setCalories(dayCaloriesRegime);
      let dayCarbohydratesRegime = parseInt(await SecureStore.getItemAsync('dayCarbohydratesRegime'));
      setCarbohydrates(dayCarbohydratesRegime);

    } else if (regime == 'malaiseMode') {
      let dayCaloriesRegime = parseInt(await SecureStore.getItemAsync('dayCaloriesRegime'));
      setCalories(dayCaloriesRegime);
      setCarbohydrates(dayCarbohydrates);

    } else {
      setCalories(dayCalories);
      setCarbohydrates(dayCarbohydrates);
    }
    
    setProtein(dayProtein);
    setFats(dayFats);

    const today = FormattedDate();
    console.log(today)
    let nameKey = today + 'mealsCount';
    let mealAmount2 = parseInt(await SecureStore.getItemAsync(nameKey));
    if (!isNaN(mealAmount2) && mealAmount2 != null) {
      setMealsCount(mealAmount2);
    } else {
      setMealsCount(mealAmount);
    }
    setName(name);
  }

  const FormattedDate = () => {
    const dateToday = new Date();
    var mm = dateToday.getMonth() + 1;
    return dateToday.getFullYear() + '-' + mm + '-' + dateToday.getDate();
  }

  const cleanEatenMealsByDate = async () => {
    const today = FormattedDate();
    let exists = await SecureStore.getItemAsync('todayFood');
    let todayFood = [];
    if (exists) {
      todayFood = JSON.parse(exists)
      todayFood = todayFood.filter(obj => {
        if (obj.date == today) {
            return obj;
        }
      })
      if (todayFood) {
        const data = JSON.stringify(todayFood);
        await SecureStore.setItemAsync('todayFood', data);
      }
    }
  }

  const cleanWeekTagsByDate = async () => {
    let today = FormattedDate();
    let weekTagsEndDateData = await SecureStore.getItemAsync('weekTagsEndDate');
    let weekTagsEndDate = JSON.parse(weekTagsEndDateData);
    if (weekTagsEndDate != null) {
      let todaySlash = today.split('-').join('/');
      let weekTagsEndDateSlash = weekTagsEndDate.split('-').join('/');
      let today2 = Date.parse(todaySlash);
      let weekTagsEndDate2 = Date.parse(weekTagsEndDateSlash);
      if (today2 >= weekTagsEndDate2) {
        await SecureStore.deleteItemAsync('weekTagsEndDate');
        await SecureStore.setItemAsync('weekTags', JSON.stringify([]));
      } 
    } 
    console.log()  
  }
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Введите код</Text>
      </View>
      <TextInput
        style={styles.phoneInput}
        value={code}
        onChangeText={pn => setCode(pn)}
        keyboardType='phone-pad'
        />
      <View style={styles.conditionBox}>
        <Text style={styles.conditionText}>Введите код, который мы вам отправили, чтобы пройти регистрацию</Text>        
      </View>
      <TouchableOpacity onPress={confirmCode}
        style={[globalStyles.mainButton, isKeyboardShown ? styles.buttonUp : styles.buttonRegular ]}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  titleBox: {
    width: wp(66.67),
    marginTop: hp(19.07),
    marginBottom: hp(7.11),
    lineHeight: hp(4.74),
  },
  title: {
    fontSize: RFValue(34, height),
    fontFamily: 'SF-Pro-Bold',
    textAlign: 'center',
    color: colors.black,
  },
  phoneInput: {
    width: wp(76.9),
    height: hp(3.43),
    lineHeight: hp(2.4),
    fontSize: RFValue(19, height),
    fontFamily: 'SF-Pro-Medium',
    borderBottomColor: colors.black,
    borderBottomWidth: wp(0.26),
    textAlign: 'center'
    //paddingBottom: wp(1.8),
  },
  conditionBox:{
    width: wp(68.72),
    height: hp(5.69),
    marginTop: hp(1.06),
  },
  conditionText: {
    fontSize: RFValue(13, height),
    lineHeight: hp(1.84),
    fontFamily: 'SF-Pro-Regular',
    textAlign: 'center',
    color: colors.grey,
  },
  buttonUp: {
    marginBottom: hp(1.54),
    marginTop: hp(11.97),
  },
  buttonRegular: {
    marginTop: hp(40.4),
    marginBottom: hp(5.57),
  },
  buttonText: {
    color: colors.white,
    fontSize: RFValue(17, height),
    lineHeight: hp(2.4),
    fontFamily: 'SF-Pro-Medium',
    textAlign: 'center',
  }
})