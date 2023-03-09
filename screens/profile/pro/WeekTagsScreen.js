import { ScrollView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Switch } from 'react-native';
import { globalStyles } from '../../../styles/styles';

const { height } = Dimensions.get('screen');

export default function WeekTagsScreen() {

  const navigation = useNavigation();

  const [porkNumber, setPorkNumber] = useState(0);
  const [beefNumber, setBeefNumber] = useState(0);
  const [meatNumber, setMeatNumber] = useState(0);
  const [chickenNumber, setChickenNumber] = useState(0);

  const [seafoodNumber, setSeafoodNumber] = useState(0);
  const [salmonNumber, setSalmonNumber] = useState(0);
  const [musselsNumber, setMusselsNumber] = useState(0);

  const [nutsNumber, setNutsNumber] = useState(0);
  const [peanutNumber, setPeanutNumber] = useState(0);
  const [sesameNumber, setSesameNumber] = useState(0);
  const [cashewNumber, setCashewNumber] = useState(0);
  const [almondNumber, setAlmondNumber] = useState(0);
  const [walnutNumber, setWalnutNumber] = useState(0);
  const [sunflowerSeedsNumber, setSunflowerSeedsNumber] = useState(0);

  const [lactoseNumber, setLactoseNumber] = useState(0);
  const [cottageCheeseNumber, setCottageCheeseNumber] = useState(0);
  const [eggNumber, setEggNumber] = useState(0);
  
  const [orangeNumber, setOrangeNumber] = useState(0);
  const [bananaNumber, setBananaNumber] = useState(0);
  const [frutsBerriesNumber, setFrutsBerriesNumber] = useState(0);

  const [avocadoNumber, setAvocadoNumber] = useState(0);
  const [beansNumber, setBeansNumber] = useState(0);
  const [whiteNumber, setWhiteNumber] = useState(0);
  const [redNumber, setRedNumber] = useState(0);
  const [yellowNumber, setYellowNumber] = useState(0);
  const [blueNumber, setBlueNumber] = useState(0);
  const [greenNumber, setGreenNumber] = useState(0);
  const [vegetablesNumber, setVegetablesNumber] = useState(0);
  
  const [buckwheatNumber, setBuckwheatNumber] = useState(0);
  const [riceNumber, setRiceNumber] = useState(0);
  const [oatsNumber, setOatsNumber] = useState(0);
  const [cerealsNumber, setCerealsNumber] = useState(0);

  const [mushroomsNumber, setMushroomsNumber] = useState(0);
  const [honeyNumber, setHoneyNumber] = useState(0);
  const [glutenNumber, setGlutenNumber] = useState(0);
  const [sugarNumber, setSugarNumber] = useState(0);

  const [steamedNumber, setSteamedNumber] = useState(0);
  const [boiledNumber, setBoiledNumber] = useState(0);
  const [stewedNumber, setStewedNumber] = useState(0);
  const [friedNumber, setFriedNumber] = useState(0);
  const [deepFriedNumber, setDeepFriedNumber] = useState(0);
  const [roastedNumber, setRoastedNumber] = useState(0);
  const [driedNumber, setDriedNumber] = useState(0);

  const navigateAndSave = () => {

    const data = {porkNumber, beefNumber, meatNumber, chickenNumber,
      seafoodNumber, salmonNumber, musselsNumber,
      nutsNumber, peanutNumber, sesameNumber, cashewNumber, almondNumber, walnutNumber, sunflowerSeedsNumber,
      lactoseNumber, cottageCheeseNumber, eggNumber,
      orangeNumber, bananaNumber, frutsBerriesNumber,
      avocadoNumber, beansNumber, whiteNumber, redNumber, yellowNumber, blueNumber, greenNumber, vegetablesNumber,
      buckwheatNumber, riceNumber, oatsNumber, cerealsNumber,
      mushroomsNumber, honeyNumber, glutenNumber, sugarNumber,
      steamedNumber, boiledNumber, stewedNumber, friedNumber, deepFriedNumber, roastedNumber, driedNumber
    }

    navigation.navigate('Password', {screenName: 'weekTags', data: data});
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={[styles.block, styles.firstBlockMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Мясо и птица</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={styles.listText}>Свинина</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setPorkNumber(previousState => previousState - 1)}
                  style={styles.signButton}  disabled={porkNumber <= 0}>
                  {porkNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{porkNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setPorkNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Говядина</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setBeefNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={beefNumber <= 0}>
                  {beefNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{beefNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setBeefNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Мясо</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setMeatNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={meatNumber <= 0}>
                  {meatNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{meatNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setMeatNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Птица</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setChickenNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={chickenNumber <= 0}>
                  {chickenNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{chickenNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setChickenNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
      </View>

      <View style={[styles.block, styles.allBlocksMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Рыба и морепродукты</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={styles.listText}>Морепродукты</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setSeafoodNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={seafoodNumber <= 0}>
                  {seafoodNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{seafoodNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setSeafoodNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Лосось</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setSalmonNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={salmonNumber <= 0}>
                  {salmonNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{salmonNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setSalmonNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Мидии</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setMusselsNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={musselsNumber <= 0}>
                  {musselsNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{musselsNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setMusselsNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
      </View>

      <View style={[styles.block, styles.allBlocksMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Орехи и семена</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={styles.listText}>Орехи</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setNutsNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={nutsNumber <= 0}>
                  {nutsNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{nutsNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setNutsNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Арахис</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setPeanutNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={peanutNumber <= 0}>
                  {peanutNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{peanutNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setPeanutNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Кунжут</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setSesameNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={sesameNumber <= 0}>
                  {sesameNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{sesameNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setSesameNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Кешью</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setCashewNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={cashewNumber <= 0}>
                  {cashewNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{cashewNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setCashewNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Миндаль</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setAlmondNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={almondNumber <= 0}>
                  {almondNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{almondNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setAlmondNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Орех грецкий</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setWalnutNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={walnutNumber <= 0}>
                  {walnutNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{walnutNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setWalnutNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Семена подсолнечника</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setSunflowerSeedsNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={sunflowerSeedsNumber <= 0}>
                  {sunflowerSeedsNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{sunflowerSeedsNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setSunflowerSeedsNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
      </View>

      <View style={[styles.block, styles.allBlocksMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Молочные продукты и яйца</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={styles.listText}>Лактоза</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setLactoseNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={lactoseNumber <= 0}>
                  {lactoseNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{lactoseNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setLactoseNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Творог</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setCottageCheeseNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={cottageCheeseNumber <= 0}>
                  {cottageCheeseNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{cottageCheeseNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setCottageCheeseNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Яйцо куриное</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setEggNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={eggNumber <= 0}>
                  {eggNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{eggNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setEggNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
      </View>

      <View style={[styles.block, styles.allBlocksMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Фрукты и ягоды</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={styles.listText}>Апельсин</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setOrangeNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={orangeNumber <= 0}>
                  {orangeNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{orangeNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setOrangeNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Банан</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setBananaNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={bananaNumber <= 0}>
                  {bananaNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{bananaNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setBananaNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Фрукты-ягоды</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setFrutsBerriesNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={frutsBerriesNumber <= 0}>
                  {frutsBerriesNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{frutsBerriesNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setFrutsBerriesNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
      </View>

      <View style={[styles.block, styles.allBlocksMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Овощи</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={styles.listText}>Авокадо</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setAvocadoNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={avocadoNumber <= 0}>
                  {avocadoNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{avocadoNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setAvocadoNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Фасоль зерновая</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setBeansNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={beansNumber <= 0}>
                  {beansNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{beansNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setBeansNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Белый</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setWhiteNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={whiteNumber <= 0}>
                  {whiteNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{whiteNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setWhiteNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Красный</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setRedNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={redNumber <= 0}>
                  {redNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{redNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setRedNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Жёлтый</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setYellowNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={yellowNumber <= 0}>
                  {yellowNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{yellowNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setYellowNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Синий</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setBlueNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={blueNumber <= 0}>
                  {blueNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{blueNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setBlueNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Зелёный</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setGreenNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={greenNumber <= 0}>
                  {greenNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{greenNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setGreenNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Овощи</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setVegetablesNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={vegetablesNumber <= 0}>
                  {vegetablesNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{vegetablesNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setVegetablesNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
      </View>

      <View style={[styles.block, styles.allBlocksMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Зерновые</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={styles.listText}>Гречка</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setBuckwheatNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={buckwheatNumber <= 0}>
                  {buckwheatNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{buckwheatNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setBuckwheatNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Рис</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setRiceNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={riceNumber <= 0}>
                  {riceNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{riceNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setRiceNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Овёс</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setOatsNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={oatsNumber <= 0}>
                  {oatsNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{oatsNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setOatsNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Зерновые</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setCerealsNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={cerealsNumber <= 0}>
                  {cerealsNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{cerealsNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setCerealsNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
      </View>

      <View style={[styles.block, styles.allBlocksMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Прочее</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={styles.listText}>Грибы</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setMushroomsNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={mushroomsNumber <= 0}>
                  {mushroomsNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{mushroomsNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setMushroomsNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Мёд</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setHoneyNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={honeyNumber <= 0}>
                  {honeyNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{honeyNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setHoneyNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Глютен</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setGlutenNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={glutenNumber <= 0}>
                  {glutenNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{glutenNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setGlutenNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={styles.listText}>Сахар</Text>
          <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setSugarNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={sugarNumber <= 0}>
                  {sugarNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{sugarNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => sugarNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
      </View>

      <View style={[styles.block, styles.allBlocksMarginTop]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Исключить способы приготовления</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
            <Text style={styles.listText}>На пару</Text>
            <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setSteamedNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={steamedNumber <= 0}>
                  {steamedNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{steamedNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setSteamedNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>


        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={styles.listText}>Варёное</Text>
            <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setBoiledNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={boiledNumber <= 0}>
                  {boiledNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{boiledNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setBoiledNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={styles.listText}>Тушёное</Text>
            <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setStewedNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={stewedNumber <= 0}>
                  {stewedNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{stewedNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setStewedNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={styles.listText}>Жареное</Text>
            <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setFriedNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={friedNumber <= 0}>
                  {friedNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{friedNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setFriedNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={styles.listText}>Во фритюре</Text>
            <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setDeepFriedNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={deepFriedNumber <= 0}>
                  {deepFriedNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{deepFriedNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setDeepFriedNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={styles.listText}>Жареное на огне</Text>
            <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setRoastedNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={roastedNumber <= 0}>
                  {roastedNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{roastedNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setRoastedNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
            <Text style={styles.listText}>Вяленое</Text>
            <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setDriedNumber(previousState => previousState - 1)}
                  style={styles.signButton} disabled={driedNumber <= 0}>
                  {driedNumber <= 0 
                  ? (<Image style={styles.sign} source={require('../../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>)}
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.listText}>{driedNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => setDriedNumber(previousState => previousState + 1)}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>
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
  counterInner: {
    height: hp(5.45),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: wp(4)
  },
  counterText: {
      width: wp(6.82),
      alignItems: 'center',
      marginHorizontal: wp(4.36),
  },
  sign: {
      height: hp(2.5),
      width: hp(2.6),
      alignSelf: 'center',
  },
  signButton: {
    width: wp(8),
    height: hp(5),
    justifyContent: 'center',
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