import { ScrollView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Switch } from 'react-native'
import firebase from "firebase/compat";
import { globalStyles } from '../../../styles/styles';

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

  const navigation = useNavigation();


  // 4
  const userId = "8D5itKpIaMZubdZLPsyP0XCDY6i1";
  
  const setPorkFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'pork': !pork })
      .catch(err => console.log(err));
    setPork(previousState => !previousState);
  }

  const setBeefFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'beef': !beef })
      .catch(err => console.log(err));
    setBeef(previousState => !previousState);
  }

  const setMeatFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'meat': !meat })
      .catch(err => console.log(err));
    setMeat(previousState => !previousState);
  }

  const setChickenFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'chicken': !chicken })
      .catch(err => console.log(err));
    setChicken(previousState => !previousState);
  }

  const setSeafoodFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'seafood': !seafood })
      .catch(err => console.log(err));
    setSeafood(previousState => !previousState);
  }

  const setSalmonFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'salmon': !salmon })
      .catch(err => console.log(err));
    setSalmon(previousState => !previousState);
  }

  const setMusselsFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'mussels': !mussels })
      .catch(err => console.log(err));
    setMussels(previousState => !previousState);
  }

  const setNutsFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'nuts': !nuts })
      .catch(err => console.log(err));
    setNuts(previousState => !previousState);
  }

  const setPeanutFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'peanut': !peanut })
      .catch(err => console.log(err));
    setPeanut(previousState => !previousState);
  }

  const setSesameFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'sesame': !sesame })
      .catch(err => console.log(err));
    setSesame(previousState => !previousState);
  }

  const setCashewFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'cashew': !cashew })
      .catch(err => console.log(err));
    setCashew(previousState => !previousState);
  }

  const setAlmondFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'almond': !almond })
      .catch(err => console.log(err));
    setAlmond(previousState => !previousState);
  }

  const setWalnutFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'walnut': !walnut })
      .catch(err => console.log(err));
    setWalnut(previousState => !previousState);
  }

  const setSunflowerSeedsFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'sunflowerSeeds': !sunflowerSeeds })
      .catch(err => console.log(err));
    setSunflowerSeeds(previousState => !previousState);
  }

  const setLactoseFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'lactose': !lactose })
      .catch(err => console.log(err));
    setLactose(previousState => !previousState);
  }

  const setCottageCheeseFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'cottageCheese': !cottageCheese })
      .catch(err => console.log(err));
    setCottageCheese(previousState => !previousState);
  }

  const setEggFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'egg': !egg })
      .catch(err => console.log(err));
    setEgg(previousState => !previousState);
  }

  const setOrangeFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'orange': !orange })
      .catch(err => console.log(err));
    setOrange(previousState => !previousState);
  }

  const setBananaFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'banana': !banana })
      .catch(err => console.log(err));
    setBanana(previousState => !previousState);
  }

  const setFrutsBerriesFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'frutsBerries': !frutsBerries })
      .catch(err => console.log(err));
    setFrutsBerries(previousState => !previousState);
  }

  const setAvocadoFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'avocado': !avocado })
      .catch(err => console.log(err));
    setAvocado(previousState => !previousState);
  }

  const setBeansFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'beans': !beans })
      .catch(err => console.log(err));
    setBeans(previousState => !previousState);
  }

  const setWhiteFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'white': !white })
      .catch(err => console.log(err));
    setWhite(previousState => !previousState);
  }

  const setRedFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'red': !red })
      .catch(err => console.log(err));
    setRed(previousState => !previousState);
  }

  const setYellowFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'yellow': !yellow })
      .catch(err => console.log(err));
    setYellow(previousState => !previousState);
  }

  const setBlueFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'blue': !blue })
      .catch(err => console.log(err));
    setBlue(previousState => !previousState);
  }

  const setGreenFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'green': !green })
      .catch(err => console.log(err));
    setGreen(previousState => !previousState);
  }

  const setVegetablesFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'vegetables': !vegetables })
      .catch(err => console.log(err));
    setVegetables(previousState => !previousState);
  }

  const setBuckwheatFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'buckwheat': !buckwheat })
      .catch(err => console.log(err));
    setBuckwheat(previousState => !previousState);
  }

  const setRiceFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'rice': !rice })
      .catch(err => console.log(err));
    setRice(previousState => !previousState);
  }

  const setOatsFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'oats': !oats })
      .catch(err => console.log(err));
    setOats(previousState => !previousState);
  }

  const setCerealsFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'cereals': !cereals })
      .catch(err => console.log(err));
    setCereals(previousState => !previousState);
  }

  const setMushroomsFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'mushrooms': !mushrooms })
      .catch(err => console.log(err));
    setMushrooms(previousState => !previousState);
  }

  const setHoneyFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'honey': !honey })
      .catch(err => console.log(err));
    setHoney(previousState => !previousState);
  }

  const setGlutenFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'gluten': !gluten })
      .catch(err => console.log(err));
    setGluten(previousState => !previousState);
  }

  const setSugarFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'sugar': !sugar })
      .catch(err => console.log(err));
    setSugar(previousState => !previousState);
  }

  const setSteamedFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'steamed': !steamed })
      .catch(err => console.log(err));
    setSteamed(previousState => !previousState);
  }

  const setBoiledFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'boiled': !boiled })
      .catch(err => console.log(err));
    setBoiled(previousState => !previousState);
  }

  const setStewedFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'stewed': !stewed })
      .catch(err => console.log(err));
    setStewed(previousState => !previousState);
  }

  const setFriedFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'fried': !fried })
      .catch(err => console.log(err));
    setFried(previousState => !previousState);
  }
  
  const setDeepFriedFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'deepFried': !deepFried })
      .catch(err => console.log(err));
    setDeepFried(previousState => !previousState);
  }

  const setRoastedFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'roasted': !roasted })
      .catch(err => console.log(err));
    setRoasted(previousState => !previousState);
  }
  
  const setDriedFirebase = () => {
    firebase.firestore().collection('tags').doc(userId)
      .update({ 'dried': !dried })
      .catch(err => console.log(err));
    setDried(previousState => !previousState);
  }

  const navigateAndSave = () => {

    const undesirableProducts = {pork, beef, meat, chicken,
      seafood, salmon, mussels,
      nuts, peanut, sesame, cashew, almond, walnut, sunflowerSeeds,
      lactose, cottageCheese, egg,
      orange, banana, frutsBerries,
      avocado, beans, white, red, yellow, blue, green, vegetables,
      buckwheat, rice, oats, cereals,
      mushrooms, honey, gluten, sugar,
      steamed, boiled, stewed, fried, deepFried, roasted, dried
    }
    navigation.navigate('Password', {tableName: 'tags', data: undesirableProducts});

  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={[styles.block, styles.firstBlockMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Мясо и птица</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Свинина</Text>
          <Switch value={pork} onValueChange={() => setPorkFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Говядина</Text>
          <Switch value={beef} onValueChange={() => setBeefFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Мясо</Text>
          <Switch value={meat} onValueChange={() => setMeatFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Птица</Text>
          <Switch value={chicken} onValueChange={() => setChickenFirebase()}
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
          <Switch value={seafood} onValueChange={() => setSeafoodFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Лосось</Text>
          <Switch value={salmon} onValueChange={() => setSalmonFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Мидии</Text>
          <Switch value={mussels} onValueChange={() => setMusselsFirebase()}
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
          <Switch value={nuts} onValueChange={() => setNutsFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Арахис</Text>
          <Switch value={peanut} onValueChange={() => setPeanutFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Кунжут</Text>
          <Switch value={sesame} onValueChange={() => setSesameFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Кешью</Text>
          <Switch value={cashew} onValueChange={() => setCashewFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Миндаль</Text>
          <Switch value={almond} onValueChange={() => setAlmondFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Орех грецкий</Text>
          <Switch value={walnut} onValueChange={() => setWalnutFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Семена подсолнечника</Text>
          <Switch value={sunflowerSeeds} onValueChange={() => setSunflowerSeedsFirebase()}
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
          <Switch value={lactose} onValueChange={() => setLactoseFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Творог</Text>
          <Switch value={cottageCheese} onValueChange={() => setCottageCheeseFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Яйцо куриное</Text>
          <Switch value={egg} onValueChange={() => setEggFirebase()}
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
          <Switch value={orange} onValueChange={() => setOrangeFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Банан</Text>
          <Switch value={banana} onValueChange={() => setBananaFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Фрукты-ягоды</Text>
          <Switch value={frutsBerries} onValueChange={() => setFrutsBerriesFirebase()}
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
          <Switch value={avocado} onValueChange={() => setAvocadoFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Фасоль зерновая</Text>
          <Switch value={beans} onValueChange={() => setBeansFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Белый</Text>
          <Switch value={white} onValueChange={() => setWhiteFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Красный</Text>
          <Switch value={red} onValueChange={() => setRedFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Жёлтый</Text>
          <Switch value={yellow} onValueChange={() => setYellowFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Синий</Text>
          <Switch value={blue} onValueChange={() => setBlueFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Зелёный</Text>
          <Switch value={green} onValueChange={() => setGreenFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Овощи</Text>
          <Switch value={vegetables} onValueChange={() => setVegetablesFirebase()}
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
          <Switch value={buckwheat} onValueChange={() => setBuckwheatFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Рис</Text>
          <Switch value={rice} onValueChange={() => setRiceFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Овёс</Text>
          <Switch value={oats} onValueChange={() => setOatsFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Зерновые</Text>
          <Switch value={cereals} onValueChange={() => setCerealsFirebase()}
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
          <Switch value={mushrooms} onValueChange={() => setMushroomsFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Мёд</Text>
          <Switch value={honey} onValueChange={() => setHoneyFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Глютен (есть в обычной настройке)</Text>
          <Switch value={gluten} onValueChange={() => setGlutenFirebase()}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Сахар (есть в обычной настройке)</Text>
          <Switch value={sugar} onValueChange={() => setSugarFirebase()}
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
            <Switch value={steamed} onValueChange={() => setSteamedFirebase()}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={[styles.listText, {width: wp(77)}]}>Варёное</Text>
            <Switch value={boiled} onValueChange={() => setBoiledFirebase()}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={[styles.listText, {width: wp(77)}]}>Тушёное</Text>
            <Switch value={stewed} onValueChange={() => setStewedFirebase()}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={[styles.listText, {width: wp(77)}]}>Жареное</Text>
            <Switch value={fried} onValueChange={() => setFriedFirebase()}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={[styles.listText, {width: wp(77)}]}>Во фритюре</Text>
            <Switch value={deepFried} onValueChange={() => setDeepFriedFirebase()}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={[styles.listText, {width: wp(77)}]}>Жареное на огне</Text>
            <Switch value={roasted} onValueChange={() => setRoastedFirebase()}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={[styles.listText, {width: wp(77)}]}>Вяленое</Text>
            <Switch value={dried} onValueChange={() => setDriedFirebase()}
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