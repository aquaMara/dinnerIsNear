import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { globalStyles } from '../../../styles/styles';
import { colors } from '../../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import * as SecureStore from 'expo-secure-store';

const { height } = Dimensions.get('screen');

export default function PasswordScreen({ route }) {

  const [propassword, setPropassword] = useState('');
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const arrayOfProPasswords = ["5",
    "11358783", "13548633", "14232928", "15893706", "16284399", "16318829",
    "16472316", "16992967", "17421907", "17747111", "18671087", "19143944", "20315932", "23085412",
    "24159669", "26274599", "28803447", "29645312", "30419772", "30591959", "30984254", "31016977",
    "31183323", "33015482", "34840994", "35451630", "36862309", "38554601", "39153387", "40330485",
    "43495954", "44255766", "45141438", "45928973", "46557761", "46909383", "47428888", "47438167",
    "50065207", "52987910", "53379732", "55766605", "56544688", "56596350", "57101050", "58622551",
    "58925762", "62569261", "62678239", "62797273", "62885249", "63048574", "63392309", "63617944"];

  const setProConfiguration = async () => {
    let isProUser = arrayOfProPasswords.includes(propassword.trim());
    if (!isProUser) {
      Alert.alert(
        'Неверный пароль',
        'Для получения пароля от PRO аккаунта необходимо связаться со специалистом',
        [
          {
            text: 'OK',
            style: 'default',
          },
        ],
      );
    } else {
      if (route.params.screenName == 'undesirableProducts') {
        await saveUndesirableProducts();
      } else if (route.params.screenName == 'weekTags') {
        await saveWeekTags();
      } else {
        console.log('Neither of screens');
      }
    }

  }

  const saveUndesirableProducts = async () => {
    console.log('saveUndesirableProducts');
    console.log('data', route.params.data);

    await SecureStore.setItemAsync('pork', route.params.data.pork == true ? '1' : '0');
    await SecureStore.setItemAsync('beef', route.params.data.beef == true ? '1' : '0');
    await SecureStore.setItemAsync('chicken', route.params.data.chicken == true ? '1' : '0');
    await SecureStore.setItemAsync('seafood', route.params.data.seafood == true ? '1' : '0');
    await SecureStore.setItemAsync('salmon', route.params.data.salmon == true ? '1' : '0');
    await SecureStore.setItemAsync('mussels', route.params.data.mussels == true ? '1' : '0');

    await SecureStore.setItemAsync('peanut', route.params.data.peanut == true ? '1' : '0');
    await SecureStore.setItemAsync('sesame', route.params.data.sesame == true ? '1' : '0');
    await SecureStore.setItemAsync('cashew', route.params.data.cashew == true ? '1' : '0');
    await SecureStore.setItemAsync('almond', route.params.data.almond == true ? '1' : '0');

    await SecureStore.setItemAsync('walnut', route.params.data.walnut == true ? '1' : '0');
    await SecureStore.setItemAsync('sunflowerSeeds', route.params.data.sunflowerSeeds == true ? '1' : '0');
    await SecureStore.setItemAsync('cottageCheese', route.params.data.cottageCheese == true ? '1' : '0');
    await SecureStore.setItemAsync('egg', route.params.data.egg == true ? '1' : '0');
    await SecureStore.setItemAsync('orange', route.params.data.orange == true ? '1' : '0');
    await SecureStore.setItemAsync('banana', route.params.data.banana == true ? '1' : '0');
    await SecureStore.setItemAsync('frutsBerries', route.params.data.frutsBerries == true ? '1' : '0');

    await SecureStore.setItemAsync('avocado', route.params.data.avocado == true ? '1' : '0');
    await SecureStore.setItemAsync('beans', route.params.data.beans == true ? '1' : '0');
    await SecureStore.setItemAsync('white', route.params.data.white == true ? '1' : '0');
    await SecureStore.setItemAsync('red', route.params.data.red == true ? '1' : '0');
    await SecureStore.setItemAsync('yellow', route.params.data.yellow == true ? '1' : '0');
    await SecureStore.setItemAsync('blue', route.params.data.blue == true ? '1' : '0');
    await SecureStore.setItemAsync('green', route.params.data.green == true ? '1' : '0');
    await SecureStore.setItemAsync('vegetables', route.params.data.vegetables == true ? '1' : '0');

    await SecureStore.setItemAsync('buckwheat', route.params.data.buckwheat == true ? '1' : '0');
    await SecureStore.setItemAsync('rice', route.params.data.rice == true ? '1' : '0');
    await SecureStore.setItemAsync('oats', route.params.data.oats == true ? '1' : '0');
    await SecureStore.setItemAsync('cereals', route.params.data.cereals == true ? '1' : '0');
    await SecureStore.setItemAsync('honey', route.params.data.honey == true ? '1' : '0');
    
    await saveTrueProTags();
    
    //navigation.navigate('Profile');

  }

  const saveTrueProTags = async () => {

    const {pork, beef, chicken,
      seafood, salmon, mussels,
      peanut, sesame, cashew, almond, walnut, sunflowerSeeds,
      cottageCheese, egg,
      orange, banana, frutsBerries,
      avocado, beans, white, red, yellow, blue, green, vegetables,
      buckwheat, rice, oats, cereals, honey
    } = route.params.data;

    let tags2 = [];
    if (pork) {
      tags2.push({pork});
    } if (beef) {
      tags2.push({beef});
    } if (chicken) {
      tags2.push({chicken});
    } if (seafood) {
      tags2.push({seafood});
    } if (salmon) {
      tags2.push({salmon});
    } if (mussels) {
      tags2.push({mussels});
    } if (peanut) {
      tags2.push({peanut});
    } if (sesame) {
      tags2.push({sesame});
    } if (cashew) {
      tags2.push({cashew});
    } if (almond) {
      tags2.push({almond});
    } if (walnut) {
      tags2.push({walnut});
    } if (sunflowerSeeds) {
      tags2.push({sunflowerSeeds});
    } if (cottageCheese) {
      tags2.push({cottageCheese});
    } if (egg) {
      tags2.push({egg});
    } if (orange) {
      tags2.push({orange});
    } if (banana) {
      tags2.push({banana});
    } if (frutsBerries) {
      tags2.push({frutsBerries});
    } if (avocado) {
      tags2.push({avocado});
    } if (beans) {
      tags2.push({beans});
    } if (white) {
      tags2.push({white});
    } if (red) {
      tags2.push({red});
    } if (yellow) {
      tags2.push({yellow});
    } if (blue) {
      tags2.push({blue});
    } if (green) {
      tags2.push({green});
    } if (vegetables) {
      tags2.push({vegetables});
    } if (buckwheat) {
      tags2.push({buckwheat});
    } if (rice) {
      tags2.push({rice});
    } if (oats) {
      tags2.push({oats});
    } if (cereals) {
      tags2.push({cereals});
    } if (honey) {
      tags2.push({honey});
    }

    let trueProTags = tags2.map(obj => {
      return Object.keys(obj).toString();
    })

    if (trueProTags) {
      await SecureStore.setItemAsync('trueProTags', JSON.stringify(trueProTags));
    }
  }

  const saveWeekTags = async () => {
    console.log('saveWeekTags');
    console.log('data', route.params.data);
  }
 
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
    'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Введите пароль</Text>
      </View>
      <View style={styles.bodyBox}>
        <Text style={styles.bodyText}>Настройка PRO доступна только после приобретения консультации со специалистом.</Text>
      </View>
      <TextInput style={styles.inputBox}
        value={propassword} onChangeText={p => setPropassword(p)} 
        editable={true} keyboardType='number-pad' />
      <View style={styles.conditionBox}>
        <Text style={styles.conditionText}>Введите код, который вам сообщил специалист для сохранения настроек.</Text>        
      </View>
      <TouchableOpacity style={[globalStyles.mainButton, isKeyboardShown ? styles.buttonUp : styles.buttonRegular ]}
        onPress={setProConfiguration}>
        <Text style={[styles.buttonText, styles.whiteButtonText]}>Войти</Text>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.whiteButton}>
        <Text style={[styles.buttonText, styles.blackButtonText]}>Заказать консультацию</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white
  },
  titleBox: {
    width: wp(66.67),
    marginTop: hp(10.31),
    marginBottom: hp(1.07),
  },
  title: {
    fontSize: RFValue(34, height),
    fontFamily: 'SF-Pro-Bold',
    textAlign: 'center',
    color: colors.black,
    lineHeight: hp(4.81),
  },
  bodyBox: {
    width: wp(66.67),
    marginBottom: hp(6.67),
  },
  bodyText: {
    fontSize: RFValue(15, height),
    fontFamily: 'SF-Pro-Regular',
    textAlign: 'center',
    color: colors.black,
    lineHeight: hp(2.12),
  },
  conditionBox: {
    width: wp(60.51),
    marginTop: hp(1.07),
  },
  conditionText: {
    fontSize: RFValue(13, height),
    fontFamily: 'SF-Pro-Regular',
    textAlign: 'center',
    color: colors.grey,
    lineHeight: hp(1.84),
  },
  inputBox: {
    width: wp(76.92),
    height: hp(3.43),
    borderBottomWidth: wp(0.26),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center'
  },
  buttonUp: {
    marginTop: hp(9.24),
    marginBottom: hp(1.54)
  },
  buttonRegular: {
    marginTop: hp(31.4),
    marginBottom: hp(1.54),
  },
  buttonText: {
    fontSize: RFValue(17, height),
    lineHeight: hp(2.4),
    fontFamily: 'SF-Pro-Medium',
    textAlign: 'center',
  },
  whiteButtonText: {
    color: colors.white,
  },
  blackButtonText: {
    color: colors.black,
  }
})