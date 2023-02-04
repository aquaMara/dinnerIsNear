import { ScrollView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Switch } from 'react-native';

const { height } = Dimensions.get('screen');

export default function UndesirableProductsScreen() {

  const [pork, setPork] = useState(false);
  const [beef, setBeef] = useState(false);
  const [meat, setMeat] = useState(false);
  const [chicken, setChicken] = useState(false);

  const [seafood, setSeafood] = useState(false);
  const [salmon, setSalmon] = useState(false);
  const [mussels, setMussels] = useState(false);

  const [nuts, setNuts] = useState(false);
  const [peanut, setPeanut] = useState(false);
  const [sesame, setSesame] = useState(false);
  const [cashew, setCashew] = useState(false);
  const [almond, setAlmond] = useState(false);
  const [walnut, setWalnut] = useState(false);
  const [sunflowerSeeds, setSunflowerSeeds] = useState(false);

  const [lactose, setLactose] = useState(false);
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

  const [mushrooms, setMushrooms] = useState(false);
  const [honey, setHoney] = useState(false);
  const [gluten, setGluten] = useState(false);
  const [sugar, setSugar] = useState(false);

  const [steamed, setSteamed] = useState(false);
  const [boiled, setBoiled] = useState(false);
  const [stewed, setStewed] = useState(false);
  const [fried, setFried] = useState(false);
  const [deepFried, setDeepFried] = useState(false);
  const [roasted, setRoasted] = useState(false);
  const [dried, setDried] = useState(false);

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
          <Text style={[styles.listText, {width: wp(77)}]}>Мясо</Text>
          <Switch value={meat} onValueChange={() => setMeat(previousState => !previousState)}
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
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Орехи</Text>
          <Switch value={nuts} onValueChange={() => setNuts(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
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
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Лактоза (есть в обычной настройке) </Text>
          <Switch value={lactose} onValueChange={() => setLactose(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
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
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Грибы сместь (есть в обычной настройке)</Text>
          <Switch value={mushrooms} onValueChange={() => setMushrooms(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Мёд</Text>
          <Switch value={honey} onValueChange={() => setHoney(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Глютен (есть в обычной настройке)</Text>
          <Switch value={gluten} onValueChange={() => setGluten(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Сахар (есть в обычной настройке)</Text>
          <Switch value={sugar} onValueChange={() => setSugar(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
      </View>

      <View style={[styles.block, styles.allBlocksMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Исключить способы приготовления</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
            <Text style={[styles.listText, {width: wp(77)}]}>На пару</Text>
            <Switch value={steamed} onValueChange={() => setSteamed(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={[styles.listText, {width: wp(77)}]}>Варёное</Text>
            <Switch value={boiled} onValueChange={() => setBoiled(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={[styles.listText, {width: wp(77)}]}>Тушёное</Text>
            <Switch value={stewed} onValueChange={() => setStewed(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={[styles.listText, {width: wp(77)}]}>Жареное</Text>
            <Switch value={fried} onValueChange={() => setFried(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={[styles.listText, {width: wp(77)}]}>Во фритюре</Text>
            <Switch value={deepFried} onValueChange={() => setDeepFried(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={[styles.listText, {width: wp(77)}]}>Жареное на огне</Text>
            <Switch value={roasted} onValueChange={() => setRoasted(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={[styles.listText, {width: wp(77)}]}>Вяленое</Text>
            <Switch value={dried} onValueChange={() => setDried(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
      </View>

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
})