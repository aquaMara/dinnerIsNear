import { ScrollView, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, } from 'react';
import SwitchSelector from "react-native-switch-selector";
import { Switch } from 'react-native';
import { useFonts } from 'expo-font';
import { globalStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from 'react-native-wheel-pick';
import { Modal } from 'react-native';
import { countCalories } from '../../functions/CountCalories';
import { countPFC } from '../../functions/CountPFC';
import { useAuth } from '../../auth/AuthProvoder';
import * as SecureStore from 'expo-secure-store';
  
const { height } = Dimensions.get('screen');

export default function ProfileStepTwo({ navigation, route }) {

    const { setCalories, setProtein, setFats, setCarbohydrates, setName, setMealsCount} = useAuth();

    const [aim, setAim] = useState('maintainWeight');
    const [aimFormatted, setAimFormatted] = useState('Поддержать форму');
    const [aimRhytm, setAimRhytm] = useState('regular');
    const [numberOfMeals, setNumberOfMeals] = useState(1);
    const [aimModalVisible, setAimModalVisible] = useState(false);

    const [veganism, setVeganism] = useState(false);
    const [vegetarianism, setVegetarianism] = useState(false);
  
    const [fish, setFish] = useState(false);
    const [meat, setMeat] = useState(false);
    const [nuts, setNuts] = useState(false);
    const [sugar, setSugar] = useState(false);
    const [gluten, setGluten] = useState(false);
    const [lactose, setLactose] = useState(false);
    const [mushrooms, setMushrooms] = useState(false);
  
    const [steamed, setSteamed] = useState(false);
    const [boiled, setBoiled] = useState(false);
    const [stewed, setStewed] = useState(false);
    const [fried, setFried] = useState(false);
    const [deepFried, setDeepFried] = useState(false);
    const [roasted, setRoasted] = useState(false);
    const [dried, setDried] = useState(false);

    const aims = ['Сбросить вес', 'Поддержать форму', 'Набрать вес'];
    const createAim = (aimFormatted) => {
        let am;
        switch (aimFormatted) {
          case 'Сбросить вес': am = 'loseWeight'; break;
          case 'Поддержать форму':  am = 'maintainWeight'; break;
          case 'Набрать вес':  am = 'gainWeight'; break;
          default: am = 'maintainWeight'; break;
        }
        return am;
    }
      
    const countProfileStatistics = () => {
        
      const {name, gender, dateOfBirthFormatted, weight, height, lifestyle} = route.params.stepOne;
      
      setAim(createAim());
      const calorieIntake = countCalories(gender, weight, height, dateOfBirthFormatted, lifestyle, aim, aimRhytm);
      const caloriesForEachMeal = parseInt(calorieIntake / numberOfMeals, 10);
      const {proteinIntake, fatsIntake, carbohydratesIntake} = countPFC(aim, calorieIntake);
    
      setCalories(calorieIntake);
      setProtein(proteinIntake);
      setFats(fatsIntake);
      setCarbohydrates(carbohydratesIntake);
      setMealsCount(numberOfMeals);
      setName(name);
    
      saveData(calorieIntake, proteinIntake, fatsIntake, carbohydratesIntake, caloriesForEachMeal,
        aim, aimRhytm, numberOfMeals, 
        veganism, vegetarianism, fish, meat, nuts, sugar, gluten, lactose, mushrooms,
        steamed, boiled, stewed, fried, deepFried, roasted, dried);
    }

    const saveData = async (calorieIntake, proteinIntake, fatsIntake, carbohydratesIntake, caloriesForEachMeal,
                              aim, aimRhytm, numberOfMeals, 
                              veganism, vegetarianism, fish, meat, nuts, sugar, gluten, lactose, mushrooms,
                              steamed, boiled, stewed, fried, deepFried, roasted, dried) => {

        await SecureStore.setItemAsync('dayCalories', calorieIntake.toString());
        await SecureStore.setItemAsync('dayProtein', proteinIntake.toString());
        await SecureStore.setItemAsync('dayFats', fatsIntake.toString());
        await SecureStore.setItemAsync('dayCarbohydrates', carbohydratesIntake.toString());
        await SecureStore.setItemAsync('oneMealCalories', caloriesForEachMeal.toString());
        await SecureStore.setItemAsync('aim', aim);
        await SecureStore.setItemAsync('aimRhytm', aimRhytm);
        await SecureStore.setItemAsync('mealAmount', numberOfMeals.toString());

        await saveTrueTags();

        await SecureStore.setItemAsync('veganism', veganism == true ? '1' : '0');
        await SecureStore.setItemAsync('vegetarianism', vegetarianism == true ? '1' : '0');
        await SecureStore.setItemAsync('fish', fish == true ? '1' : '0');
        await SecureStore.setItemAsync('meat', meat == true ? '1' : '0');
        await SecureStore.setItemAsync('nuts', nuts == true ? '1' : '0');
        await SecureStore.setItemAsync('sugar', sugar == true ? '1' : '0');
        await SecureStore.setItemAsync('gluten', gluten == true ? '1' : '0');
        await SecureStore.setItemAsync('lactose', lactose == true ? '1' : '0');
        await SecureStore.setItemAsync('mushrooms', mushrooms == true ? '1' : '0');
        await SecureStore.setItemAsync('steamed', steamed == true ? '1' : '0');

        await SecureStore.setItemAsync('boiled', boiled == true ? '1' : '0');
        await SecureStore.setItemAsync('stewed', stewed == true ? '1' : '0');
        await SecureStore.setItemAsync('fried', fried == true ? '1' : '0');
        await SecureStore.setItemAsync('deepFried', deepFried == true ? '1' : '0');
        await SecureStore.setItemAsync('roasted', roasted == true ? '1' : '0');
        await SecureStore.setItemAsync('dried', dried == true ? '1' : '0');

        navigation.navigate('CalorieCount');
    }

    const saveTrueTags = async () => {
      let tags2 = [];
      if (veganism) {
        tags2.push({veganism});
      } if (vegetarianism) {
        tags2.push({vegetarianism});
      } if (fish) {
        tags2.push({fish});
      } if (meat) {
        tags2.push({meat});
      } if (nuts) {
        tags2.push({nuts});
      } if (sugar) {
        tags2.push({sugar});
      } if (gluten) {
        tags2.push({gluten});
      } if (lactose) {
        tags2.push({lactose});
      } if (mushrooms) {
        tags2.push({mushrooms});
      } if (steamed) {
        tags2.push({steamed});
      } if (boiled) {
        tags2.push({boiled});
      } if (stewed) {
        tags2.push({stewed});
      } if (fried) {
        tags2.push({fried});
      } if (deepFried) {
        tags2.push({deepFried});
      } if (roasted) {
        tags2.push({roasted});
      } if (dried) {
        tags2.push({dried});
      }

      if (tags2[0] != null) {
        let trueTags = tags2.map(obj => {
          return Object.keys(obj).toString();
        })
  
        if (trueTags) {
          await SecureStore.setItemAsync('trueTags', JSON.stringify(trueTags));
        }
      }
          
    }

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
  });
        
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={[styles.block, {marginTop: hp(2.37)}]}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Цель</Text>
        </View>
        <View style={styles.modalOpenBlock}>
            <TouchableOpacity onPress={() => setAimModalVisible(true)}>
                <Text style={styles.listText}>{aimFormatted}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.modalContainer}>
            <Modal animationType='slide' transparent={true} visible={aimModalVisible}>
              <View style={styles.modalStyle}>
                <Picker 
                  style={{backgroundColor: colors.white, width: wp(84), borderRadius: wp(5.13)}}
                  itemStyle={styles.listText} selectedValue='Поддержать форму'
                  pickerData={aims} onValueChange={value => {setAimFormatted(value); setAim(createAim(value))}} />
                <TouchableOpacity style={{width: wp(20), height: hp(3), justifyContent: 'center'}}
                  onPress={() => setAimModalVisible(!aimModalVisible)}>
                  <Text style={[styles.listText, aimModalVisible && {textAlign: 'center'}]}>OK</Text>
                </TouchableOpacity>
              </View>
            </Modal>
        </View>
      </View>
      {aimFormatted != 'Поддержать форму' ?
        (<View style={styles.block}>
          <View style={{ alignItems: 'center' }}>
            <SwitchSelector style={{width: wp(91.8), marginLeft: 0, marginRight: 'auto'}}
              initial={0} onPress={wl => setAimRhytm(wl) }
              textColor={colors.black} selectedColor={colors.white} buttonColor={colors.green}
              borderColor='rgba(118, 118, 128, 0)' backgroundColor='rgba(118, 118, 128, 0.12)'
              hasPadding borderRadius={hp(1.07)} borderWidth={hp(0.1)}
              height={hp(4.59)}
              options={[
                { label: 'Плавно', value: "smooth" },
                { label: 'Обычно', value: "regular" },
                { label: 'Активно', value: "active" },
                ]} />
          </View>
        </View>
      ) : null}
      <View style={styles.block}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Количество приёмов пищи</Text>
        </View>      
        <View style={styles.counterContainer}>
          <Text style={[styles.listText, {width: wp(60)}]}>Приёмы пищи</Text>
          <View style={styles.counterInner}>
            <TouchableOpacity onPress={() => setNumberOfMeals(previousState => previousState - 1)}
              style={styles.signButton}
              disabled={numberOfMeals <= 1}>
                {numberOfMeals <= 1 
                  ? (<Image style={styles.sign} source={require('../../assets/images/minusGray.png')}/>) 
                  : (<Image style={styles.sign} source={require('../../assets/images/minusGreen.png')}/>) }
            </TouchableOpacity>
            <View style={styles.counterText}>
                <Text style={styles.listText}>{numberOfMeals}</Text>
            </View>
            <TouchableOpacity onPress={() => setNumberOfMeals(previousState => previousState + 1)}
              disabled={numberOfMeals >= 6} style={styles.signButton}>
              {numberOfMeals >= 6 
                ? (<Image style={styles.sign} source={require('../../assets/images/plusGray.png')}/>) 
                : (<Image style={styles.sign} source={require('../../assets/images/plusGreen.png')}/>) }
            </TouchableOpacity>
            </View>
        </View>
      </View>
      <View style={styles.block}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Система питания</Text>
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.listText, {width: wp(77)}]}>Веганство</Text>
            <Switch value={veganism} onValueChange={() => setVeganism(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.listText, {width: wp(77)}]}>Вегетарианство</Text>
            <Switch value={vegetarianism} onValueChange={() => setVegetarianism(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
      </View>
      <View style={styles.block}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Исключить продукты из рациона</Text>
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.listText, {width: wp(77)}]}>Рыба</Text>
            <Switch value={fish} onValueChange={() => setFish(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.listText, {width: wp(77)}]}>Мясо</Text>
            <Switch value={meat} onValueChange={() => setMeat(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.listText, {width: wp(77)}]}>Орехи</Text>
            <Switch value={nuts} onValueChange={() => setNuts(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.listText, {width: wp(77)}]}>Сахар</Text>
            <Switch value={sugar} onValueChange={() => setSugar(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.listText, {width: wp(77)}]}>Глютен</Text>
            <Switch value={gluten} onValueChange={() => setGluten(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.listText, {width: wp(77)}]}>Лактоза</Text>
            <Switch value={lactose} onValueChange={() => setLactose(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.listText, {width: wp(77)}]}>Грибы</Text>
            <Switch value={mushrooms} onValueChange={() => setMushrooms(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
      </View>
      <View style={styles.block}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Исключить способы приготовления</Text>
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.listText, {width: wp(77)}]}>На пару</Text>
            <Switch value={steamed} onValueChange={() => setSteamed(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.listText, {width: wp(77)}]}>Варёное</Text>
            <Switch value={boiled} onValueChange={() => setBoiled(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.listText, {width: wp(77)}]}>Тушёное</Text>
            <Switch value={stewed} onValueChange={() => setStewed(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.listText, {width: wp(77)}]}>Жареное</Text>
            <Switch value={fried} onValueChange={() => setFried(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.listText, {width: wp(77)}]}>Во фритюре</Text>
            <Switch value={deepFried} onValueChange={() => setDeepFried(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.listText, {width: wp(77)}]}>Жареное на огне</Text>
            <Switch value={roasted} onValueChange={() => setRoasted(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.listText, {width: wp(77)}]}>Вяленое</Text>
            <Switch value={dried} onValueChange={() => setDried(previousState => !previousState)}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
                style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
                thumbColor={colors.white} />
        </View>
      </View>
      <TouchableOpacity onPress={countProfileStatistics} style={[globalStyles.mainButton, {marginTop: hp(3.08)}]}>
        <Text style={styles.buttonText}>Следующий шаг</Text>
      </TouchableOpacity>
      <View style={styles.stepBox}>
        <Text style={[styles.labelText, styles.stepText]}>Шаг 2 из 2</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    block: {
      marginTop: hp(3.56),
      marginLeft: wp(4),
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
    textInput : {
      width: wp(95.9),
      height: hp(5.45),
      marginTop: hp(1.78),
      lineHeight: hp(2.4),
      fontSize: RFValue(17, height),
      fontFamily: 'SF-Pro-Regular',
      borderBottomColor: colors.separator,
      borderBottomWidth: wp(0.26),
    },
      listText: {
        fontSize: RFValue(17, height),
        fontFamily: 'SF-Pro-Regular',
        color: colors.black,
        lineHeight: hp(2.4),
      },
      modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalOpenBlock: {
        width: wp(95.9),
        height: hp(5.45),
        marginTop: hp(1.78),
        borderBottomWidth: wp(0.26),
        borderBottomColor: colors.separator,
        justifyContent: 'center',
      },
      modalStyle: {
        width: wp (86),
        height: hp(36),
        marginTop: hp(30),
        backgroundColor: colors.white,
        alignItems: 'center',
        alignSelf: 'center',
        //borderWidth: 0.3,
        //borderColor: colors.separator,
                
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowColor: colors.black,
        shadowRadius: wp(2.05),
        shadowOpacity: 0.15,
        borderRadius: wp(5.13)
      },
      counterContainer: {
        width: wp(95.9),
        height: hp(5.45),
        marginTop: hp(1.78),
        marginLeft: 'auto',
        marginRight: wp(5.38),
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
      },
      counterText: {
          width: wp(6.82),
          alignItems: 'center',
          marginHorizontal: wp(4.36)
      },
      sign: {
          height: hp(2.5),
          width: hp(2.6),
          alignSelf: 'center',
      },
      signButton: {
        width: wp(8),
        height: hp(5),
        justifyContent: 'center'
      },
      plusSign: {
          fontSize: RFValue(40, height),
          fontFamily: 'SF-Pro-Bold',
      },
      minusSign: {
          fontSize: RFValue(50, height),
          fontFamily: 'SF-Pro-Medium',
      },
      toggleBlock: {
        height: hp(4.98),
        width: wp(95.9),
        marginTop: hp(1.78),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: colors.separator,
        borderBottomWidth: wp(0.26),
      },
      buttonText: {
        color: colors.white,
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        fontFamily: 'SF-Pro-Medium',
        textAlign: 'center',
      },      
    stepBox: {
        marginTop: hp(1.54),
        marginBottom: hp(5.57)
    },  
    stepText: {
        textAlign: 'center',
    },
})
