import { ScrollView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Switch } from 'react-native';
import { globalStyles } from '../../../styles/styles';
import { useAuth } from '../../../auth/AuthProvoder';
import * as SecureStore from 'expo-secure-store';

const { height } = Dimensions.get('screen');

export default function ModesScreen() {

  const navigation = useNavigation();
  const { setCalories, setCarbohydrates } = useAuth();
 
  const [period, setPeriod] = useState(false);
  const [poisoning, setPoisoning] = useState(false);
  const [malaiseMode, setMalaiseMode] = useState(false);
  
  const navigateAndSave = async () => {
    if (period) {
      await countPeriod();
    } else if (poisoning) {
      await countPoisoning();
    } else if (malaiseMode) {
      await countMalaiseMode();
    } else {
      await countNoRegime();
    }
  }

  const countPeriod = async () => {
    await SecureStore.setItemAsync('regime', 'period');

    let dayCalories = parseInt(await SecureStore.getItemAsync('dayCalories'));
    let dayCaloriesRegime = parseInt(dayCalories * 1.15, 10);
    await SecureStore.setItemAsync('dayCaloriesRegime', JSON.stringify(dayCaloriesRegime));
    setCalories(dayCaloriesRegime);

    let dayCarbohydrates = parseInt(await SecureStore.getItemAsync('dayCarbohydrates'));
    let dayCarbohydratesRegime = parseInt(dayCarbohydrates * 1.15, 10);
    await SecureStore.setItemAsync('dayCarbohydratesRegime', JSON.stringify(dayCarbohydratesRegime));
    setCarbohydrates(dayCarbohydratesRegime);

    navigation.navigate('Profile');
  }

  const countPoisoning = async () => {
    await SecureStore.setItemAsync('regime', 'poisoning');

    await SecureStore.setItemAsync('gluten', '1');
    await SecureStore.setItemAsync('lactose', '1');
    await SecureStore.setItemAsync('deepFried', '1');
    await SecureStore.setItemAsync('roasted', '1');
    await SecureStore.setItemAsync('dried', '1');

    await SecureStore.setItemAsync('cottageCheese', '1');
    await SecureStore.setItemAsync('egg', '1');
    await SecureStore.setItemAsync('frutsBerries', '1');
    await SecureStore.setItemAsync('vegetables', '1');

    let trueTagsData = await SecureStore.getItemAsync('trueTags');
    let trueTags = JSON.parse(trueTagsData);
    if (!trueTags.includes('gluten')) {
      trueTags.push('gluten');
    } if (!trueTags.includes('lactose')) {
      trueTags.push('lactose');
    } if (!trueTags.includes('deepFried')) {
      trueTags.push('deepFried');
    } if (!trueTags.includes('roasted')) {
      trueTags.push('roasted');
    } if (!trueTags.includes('dried')) {
      trueTags.push('dried');
    }
    await SecureStore.setItemAsync('trueTags', JSON.stringify(trueTags));
    
    let trueProTagsData = await SecureStore.getItemAsync('trueProTags');
    let trueProTags = JSON.parse(trueProTagsData);
    if (!trueProTags.includes('cottageCheese')) {
      trueProTags.push('cottageCheese');
    } if (!trueProTags.includes('egg')) {
      trueProTags.push('egg');
    } if (!trueProTags.includes('frutsBerries')) {
      trueProTags.push('frutsBerries');
    } if (!trueProTags.includes('vegetables')) {
      trueProTags.push('vegetables');
    }
    await SecureStore.setItemAsync('trueProTags', JSON.stringify(trueProTags));

    navigation.navigate('Profile');
  }

  const countMalaiseMode = async () => {
    await SecureStore.setItemAsync('regime', 'malaiseMode');

    await SecureStore.setItemAsync('deepFried', '1');
    await SecureStore.setItemAsync('roasted', '1');
    await SecureStore.setItemAsync('dried', '1');

    let trueTagsData = await SecureStore.getItemAsync('trueTags');
    let trueTags = JSON.parse(trueTagsData);
    if (!trueTags.includes('deepFried')) {
      trueTags.push('deepFried');
    } if (!trueTags.includes('roasted')) {
      trueTags.push('roasted');
    } if (!trueTags.includes('dried')) {
      trueTags.push('dried');
    }
    await SecureStore.setItemAsync('trueTags', JSON.stringify(trueTags));

    let dayCalories = parseInt(await SecureStore.getItemAsync('dayCalories'));
    let dayCaloriesRegime = parseInt(dayCalories * 1.15, 10);
    await SecureStore.setItemAsync('dayCaloriesRegime', JSON.stringify(dayCaloriesRegime));
    setCalories(dayCaloriesRegime);

    navigation.navigate('Profile');
  }

  const countNoRegime = async () => {
    await SecureStore.setItemAsync('regime', 'none');

    let dayCalories = parseInt(await SecureStore.getItemAsync('dayCalories'));
    setCalories(dayCalories);

    let dayCarbohydrates = parseInt(await SecureStore.getItemAsync('dayCarbohydrates'));
    setCarbohydrates(dayCarbohydrates);

    navigation.navigate('Profile');
  }

  useEffect(() => {

    (async () => {
      
      let regime = await SecureStore.getItemAsync('regime');
      if (regime == 'period') {
        setPeriod(true);
      }
      if (regime == 'malaiseMode') {
        setMalaiseMode(true);
      }
      if (regime == 'poisoning') {
        setPoisoning(true);
      }
    })();

  }, [])

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={styles.block}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Режимы работы приложения</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>ПМС</Text>
          <Switch value={period} onValueChange={() => setPeriod(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Отравление</Text>
          <Switch value={poisoning} onValueChange={() => setPoisoning(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Недомогание / Простуда</Text>
          <Switch value={malaiseMode} onValueChange={() => setMalaiseMode(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
      </View>
      <View style={styles.smallBlock}>
        <Text style={[styles.smallText]}>Включая данные настройки мы помогаем вам изменить рацион, чтобы вы быстрее поправились.</Text>
      </View>
      <TouchableOpacity style={[globalStyles.mainButton, styles.mainButtonPlace]}
        onPress={navigateAndSave}>
        <Text style={styles.buttonText}>Сохранить</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  block: {
    marginLeft: wp(4.1),
    marginTop: hp(2.49),
  },
  labelBlock: {
    height: hp(1.9),
  },
  labelText: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: RFValue(13, height),
    lineHeight: hp(1.84),
    color: colors.grey,
    textAlign: 'left'
  },
  listText: {
    fontSize: RFValue(17, height),
    fontFamily: 'SF-Pro-Regular',
    color: colors.black,
    lineHeight: hp(2.4),
  },
  toggleBlock: {
    height: hp(4.98),
    width: wp(95.9),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.separator,
    borderBottomWidth: wp(0.26),
  },
  firstToggleBlockMarginTop: {
    marginTop: hp(1.78),
  },
  allToggleBlockMarginTop: {
    marginTop: hp(1.07),
  },
  smallBlock: {
    width: wp(77.95),
    height: hp(3.79),
    marginTop: hp(1.54),
    alignSelf: 'center',
  },
  smallText: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: RFValue(13, height),
    lineHeight: hp(1.84),
    color: colors.grey,
    textAlign: 'center'
  },
  buttonText: {
    color: colors.white,
    fontSize: RFValue(17, height),
    lineHeight: hp(2.4),
    fontFamily: 'SF-Pro-Medium',
    textAlign: 'center',
  },
  mainButtonPlace: {
    marginTop: hp(3.2)
  }
})