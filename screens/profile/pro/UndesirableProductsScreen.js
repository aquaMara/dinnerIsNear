import { ScrollView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Switch } from 'react-native'
import { globalStyles } from '../../../styles/styles';

import * as SecureStore from 'expo-secure-store';

const { height } = Dimensions.get('screen');

export default function UndesirableProductsScreen() {

  const [pork, setPork] = useState(false);
  const [beef, setBeef] = useState(false);
  const [chicken, setChicken] = useState(false);

  const [seafood, setSeafood] = useState(false);
  const [salmon, setSalmon] = useState(false);
  const [mussels, setMussels] = useState(false);

  const [peanut, setPeanut] = useState(false);
  const [sesame, setSesame] = useState(false);
  const [cashew, setCashew] = useState(false);
  const [almond, setAlmond] = useState(false);
  const [walnut, setWalnut] = useState(false);
  const [sunflowerSeeds, setSunflowerSeeds] = useState(false);

  const [cottageCheese, setCottageCheese] = useState(false);
  const [egg, setEgg] = useState(false);
  
  const [orange, setOrange] = useState(false);
  const [banana, setBanana] = useState(false);
  const [frutsBerries, setFrutsBerries] = useState(false);

  const [avocado, setAvocado] = useState(false);
  const [beans, setBeans] = useState(false);
  const [white, setWhite] = useState(false);
  const [red, setRed] = useState(false);
  const [yellow, setYellow] = useState(false);
  const [blue, setBlue] = useState(false);
  const [green, setGreen] = useState(false);
  const [vegetables, setVegetables] = useState(false);
  
  const [buckwheat, setBuckwheat] = useState(false);
  const [rice, setRice] = useState(false);
  const [oats, setOats] = useState(false);
  const [cereals, setCereals] = useState(false);
  const [honey, setHoney] = useState(false);

  const navigation = useNavigation();
  
  const navigateAndSave = () => {

    const data = {pork, beef, chicken,
      seafood, salmon, mussels,
      peanut, sesame, cashew, almond, walnut, sunflowerSeeds,
      cottageCheese, egg,
      orange, banana, frutsBerries,
      avocado, beans, white, red, yellow, blue, green, vegetables,
      buckwheat, rice, oats, cereals, honey
    }
    
    navigation.navigate('Password', {screenName: 'undesirableProducts', data: data});
  }

  useEffect(() => {

    (async () => {
      setPork(await SecureStore.getItemAsync('pork') == 1 ? true : false);
      setBeef(await SecureStore.getItemAsync('beef') == 1 ? true : false);
      setChicken(await SecureStore.getItemAsync('chicken') == 1 ? true : false);
      setSeafood(await SecureStore.getItemAsync('seafood') == 1 ? true : false);
      setSalmon(await SecureStore.getItemAsync('salmon') == 1 ? true : false);
      setMussels(await SecureStore.getItemAsync('mussels') == 1 ? true : false);
      setPeanut(await SecureStore.getItemAsync('peanut') == 1 ? true : false);
      setSesame(await SecureStore.getItemAsync('sesame') == 1 ? true : false);
      setCashew(await SecureStore.getItemAsync('cashew') == 1 ? true : false);
      setAlmond(await SecureStore.getItemAsync('almond') == 1 ? true : false);
      setWalnut(await SecureStore.getItemAsync('walnut') == 1 ? true : false);
      setSunflowerSeeds(await SecureStore.getItemAsync('sunflowerSeeds') == 1 ? true : false);
      setCottageCheese(await SecureStore.getItemAsync('cottageCheese') == 1 ? true : false);
      setEgg(await SecureStore.getItemAsync('egg') == 1 ? true : false);
      setOrange(await SecureStore.getItemAsync('orange') == 1 ? true : false);
      setBanana(await SecureStore.getItemAsync('banana') == 1 ? true : false);
      setFrutsBerries(await SecureStore.getItemAsync('frutsBerries') == 1 ? true : false);
      setAvocado(await SecureStore.getItemAsync('avocado') == 1 ? true : false);
      setBeans(await SecureStore.getItemAsync('beans') == 1 ? true : false);
      setWhite(await SecureStore.getItemAsync('white') == 1 ? true : false);
      setRed(await SecureStore.getItemAsync('red') == 1 ? true : false);
      setYellow(await SecureStore.getItemAsync('yellow') == 1 ? true : false);
      setBlue(await SecureStore.getItemAsync('blue') == 1 ? true : false);
      setGreen(await SecureStore.getItemAsync('green') == 1 ? true : false);
      setVegetables(await SecureStore.getItemAsync('vegetables') == 1 ? true : false);
      setBuckwheat(await SecureStore.getItemAsync('buckwheat') == 1 ? true : false);
      setRice(await SecureStore.getItemAsync('rice') == 1 ? true : false);
      setOats(await SecureStore.getItemAsync('oats') == 1 ? true : false);
      setCereals(await SecureStore.getItemAsync('cereals') == 1 ? true : false);
      setHoney(await SecureStore.getItemAsync('honey') == 1 ? true : false);
    })();

  }, [])

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={[styles.block, styles.firstBlockMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Мясо и птица</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Свинина</Text>
          <Switch value={pork} onValueChange={() => setPork(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Говядина</Text>
          <Switch value={beef} onValueChange={() => setBeef(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Птица</Text>
          <Switch value={chicken} onValueChange={() => setChicken(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
      </View>

      <View style={[styles.block, styles.allBlocksMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Рыба и морепродукты</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Морепродукты</Text>
          <Switch value={seafood} onValueChange={() => setSeafood(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Лосось</Text>
          <Switch value={salmon} onValueChange={() => setSalmon(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Мидии</Text>
          <Switch value={mussels} onValueChange={() => setMussels(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
      </View>

      <View style={[styles.block, styles.allBlocksMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Орехи и семена</Text>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Арахис</Text>
          <Switch value={peanut} onValueChange={() => setPeanut(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Кунжут</Text>
          <Switch value={sesame} onValueChange={() => setSesame(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Кешью</Text>
          <Switch value={cashew} onValueChange={() => setCashew(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Миндаль</Text>
          <Switch value={almond} onValueChange={() => setAlmond(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Орех грецкий</Text>
          <Switch value={walnut} onValueChange={() => setWalnut(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Семена подсолнечника</Text>
          <Switch value={sunflowerSeeds} onValueChange={() => setSunflowerSeeds(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
      </View>

      <View style={[styles.block, styles.allBlocksMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Молочные продукты и яйца</Text>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Творог</Text>
          <Switch value={cottageCheese} onValueChange={() => setCottageCheese(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Яйцо куриное</Text>
          <Switch value={egg} onValueChange={() => setEgg(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
      </View>

      <View style={[styles.block, styles.allBlocksMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Фрукты и ягоды</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Апельсин</Text>
          <Switch value={orange} onValueChange={() => setOrange(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Банан</Text>
          <Switch value={banana} onValueChange={() => setBanana(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Фрукты-ягоды</Text>
          <Switch value={frutsBerries} onValueChange={() => setFrutsBerries(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
      </View>

      <View style={[styles.block, styles.allBlocksMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Овощи</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Авокадо</Text>
          <Switch value={avocado} onValueChange={() => setAvocado(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Фасоль зерновая</Text>
          <Switch value={beans} onValueChange={() => setBeans(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Белый</Text>
          <Switch value={white} onValueChange={() => setWhite(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Красный</Text>
          <Switch value={red} onValueChange={() => setRed(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Жёлтый</Text>
          <Switch value={yellow} onValueChange={() => setYellow(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Синий</Text>
          <Switch value={blue} onValueChange={() => setBlue(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Зелёный</Text>
          <Switch value={green} onValueChange={() => setGreen(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Овощи</Text>
          <Switch value={vegetables} onValueChange={() => setVegetables(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
      </View>

      <View style={[styles.block, styles.allBlocksMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Зерновые</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Гречка</Text>
          <Switch value={buckwheat} onValueChange={() => setBuckwheat(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Рис</Text>
          <Switch value={rice} onValueChange={() => setRice(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Овёс</Text>
          <Switch value={oats} onValueChange={() => setOats(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Зерновые</Text>
          <Switch value={cereals} onValueChange={() => setCereals(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
      </View>

      <View style={[styles.block, styles.allBlocksMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Прочее</Text>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Мёд</Text>
          <Switch value={honey} onValueChange={() => setHoney(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
      </View>
      <TouchableOpacity style={[globalStyles.mainButton, styles.mainButtonPlace]} onPress={() => navigateAndSave()}>
        <Text style={styles.buttonText}>Сохранить</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  block: {
    marginLeft: wp(4.1),
  },
  firstBlockMarginTop: {
    marginTop: hp(2.49),
  },
  allBlocksMarginTop : {
    marginTop: hp(1.54),
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
  buttonText: {
    color: colors.white,
    fontSize: RFValue(17, height),
    lineHeight: hp(2.4),
    fontFamily: 'SF-Pro-Medium',
    textAlign: 'center',
  },
  mainButtonPlace: {
    marginVertical: hp(3.2)
  }
})