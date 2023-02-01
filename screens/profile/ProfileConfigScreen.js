import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { globalStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SwitchSelector from "react-native-switch-selector";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from 'react-native-wheel-pick';
import { Switch } from 'react-native';

import { countCalories } from '../../functions/CountCalories';
import { countPFC } from '../../functions/CountPFC';
import { useAuth } from '../../auth/AuthProvoder';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('screen');

export default function ProfileConfigScreen() {

  const navigation = useNavigation();

  // AUTH PROVIDER
  const {mealsCount, setMealsCount} = useAuth();
  const {name, setName} = useAuth();
  // Stable values for every day
  const {calories, setCalories} = useAuth();
  const {protein, setProtein} = useAuth();
  const {fats, setFats} = useAuth();
  const {carbohydrates, setCarbohydrates} = useAuth();

  const [nameData, setNameData] = useState('');
  const [gender, setGender] = useState('female');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateOfBirthFormatted, setDateOfBirthFormatted] = useState('2023/1/1');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [lifestyle, setLifestyle] = useState('average');
  const [lifestyleFormatted, setLifestyleFormatted] = useState('Средняя активность');
  const [aim, setAim] = useState('maintainWeight');
  const [aimFormatted, setAimFormatted] = useState('Поддержать форму');
  const [aimRhytm, setAimRhytm] = useState('regular');
  const [numberOfMeals, setNumberOfMeals] = useState(1);

  const [birthdayModalVisible, setBirthdayModalVisible] = useState(false);
  const [lifestyleModalVisible, setLifestyleModalVisible] = useState(false);
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

  const setDate = (event, date) => {
    var mm = date.getMonth() + 1;
    setDateOfBirth(date);
    setDateOfBirthFormatted(date.getFullYear() + '/' + mm + '/' + date.getDate());
  };

  const aims = ['Сбросить вес', 'Поддержать форму', 'Набрать вес'];
  const lifestyles = [
    'Минимальная активность', 'Небольшая активность', 'Средняя активность',
    'Активность выше среднего', 'Повышенная активность', 
    'Высокая активность', 'Очень высокая активность'];

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

  const createLifestyle = (lifestyleFormatted) => {
    let lf;
    switch (lifestyleFormatted) {
        case 'Минимальная активность': lf = 'minimum'; break;
        case 'Небольшая активность':  lf = 'little'; break;
        case 'Средняя активность':  lf = 'average'; break;
        case 'Активность выше среднего':  lf = 'higherThanAverage'; break;
        case 'Повышенная активность':  lf = 'increased'; break;
        case 'Высокая активность': lf = 'high'; break;
        case 'Очень высокая активность': lf = 'veryHigh'; break;
        default: lf = 'min'; break;
    }
    return lf;
  }

  const countProfileStatistics = () => {
    setAim(createAim());
    setLifestyle(createLifestyle());

    const calorieIntake = countCalories(gender, weight, height, dateOfBirth, lifestyle, aim, aimRhytm);
    const caloriesForEachMeal = parseInt(calorieIntake / numberOfMeals, 10);
    const {proteinIntake, fatsIntake, carbohydratesIntake} = countPFC(aim, calorieIntake);

    setCalories(calorieIntake);
    setProtein(proteinIntake);
    setFats(fatsIntake);
    setCarbohydrates(carbohydratesIntake);
    setMealsCount(numberOfMeals);
    setName(nameData);

    sendToFirebase(calorieIntake, proteinIntake, fatsIntake, carbohydratesIntake,
      name, gender, dateOfBirth, weight, height, lifestyle, aim, aimRhytm, numberOfMeals, 
      veganism, vegetarianism, fish, meat, nuts, sugar, gluten, lactose, mushrooms,
      steamed, boiled, stewed, fried, deepFried, roasted, dried );

    //return {calories, protein, fats, carbohydrates, mealsCount, name, aim, lifestyle}
  }

  const sendToFirebase = (calorieIntake, proteinIntake, fatsIntake, carbohydratesIntake,
                        name, gender, dateOfBirth, weight, height, lifestyle, aim, aimRhytm, numberOfMeals, 
                        veganism, vegetarianism, fish, meat, nuts, sugar, gluten, lactose, mushrooms,
                        steamed, boiled, stewed, fried, deepFried, roasted, dried ) => {
    console.log('sendToFirebase ********************************************************')
    console.log(calorieIntake, proteinIntake, fatsIntake, carbohydratesIntake)
    console.log(name, gender, dateOfBirth, weight, height, lifestyle, aim, aimRhytm, numberOfMeals);
    console.log("veganism", veganism, "vegetarianism", vegetarianism);
    console.log("fish", fish,"meat", meat, "nuts", nuts, "sugar", sugar, "gluten", gluten, "lactose", lactose, "mushrooms", mushrooms);
    console.log(steamed, boiled, stewed, fried, deepFried, roasted, dried);
    console.log('********************************************************')
    console.log(calories, protein, fats, carbohydrates, mealsCount, name, aim, lifestyle);

    navigation.navigate('Profile');
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
    <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={styles.block}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Имя Фамилия</Text>
        </View>
        <TextInput style={styles.textInput} value={nameData}
            placeholder='Введите имя и фамилию' placeholderTextColor={colors.grey}
            onChangeText={n => setNameData(n)} />
      </View>
      <View style={styles.block}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Пол</Text>
        </View>
        <SwitchSelector style={{  width: wp(91.8), marginTop: hp(1.78), }}
            initial={0} onPress={g => setGender(g)}
            options={[
              { label: "Женский", value: "female" },
              { label: "Мужской", value: "male" }
            ]}
            textColor={colors.black} selectedColor={colors.white}
            buttonColor={colors.green}
            borderColor='rgba(118, 118, 128, 0)' backgroundColor='rgba(118, 118, 128, 0.12)'
            hasPadding borderRadius={hp(1.07)} 
            borderWidth={hp(0.1)} height={hp(4.59)} />
      </View>
      <View style={styles.block}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Дата рождения</Text>
        </View>
        <View style={styles.modalOpenBlock}>
            <TouchableOpacity onPress={() => setBirthdayModalVisible(true)}>
                <Text style={styles.listText}>{dateOfBirthFormatted}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.modalContainer}>
            <Modal animationType="slide" transparent={true} visible={birthdayModalVisible}>
              <View style={styles.modalStyle}>
                <DateTimePicker value={dateOfBirth} display='spinner' mode='date'
                  style={{backgroundColor: 'white'}} textColor={colors.black}
                  themeVariant='light' locale='rus-RUS'
                  minimumDate={new Date(1950, 0, 1)} maximumDate={new Date(2030, 10, 20)}
                  onChange={setDate} dateFormat="dayofweek day month" />
                <TouchableOpacity style={{width: wp(20), height: hp(3), justifyContent: 'center'}}
                  onPress={() => setBirthdayModalVisible(!birthdayModalVisible)}>
                  <Text style={[styles.listText, birthdayModalVisible && {textAlign: 'center'}]}>OK</Text>
                </TouchableOpacity>
              </View>
            </Modal>
        </View>
      </View> 
      <View style={styles.block}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Рост</Text>
        </View>
        <TextInput style={styles.textInput} value={height}
            placeholder='Введите свой рост в см' placeholderTextColor={colors.grey}
            onChangeText={h => setHeight(h)} keyboardType='number-pad' />
      </View>
      <View style={styles.block}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Вес</Text>
        </View>
        <TextInput style={styles.textInput} value={weight}
            placeholder='Введите свой вес в кг' placeholderTextColor={colors.grey}
            onChangeText={w => setWeight(w)} keyboardType='numeric' />
      </View>
      <View style={styles.block}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Активность</Text>
        </View>
        <View style={styles.modalOpenBlock}>
            <TouchableOpacity onPress={() => setLifestyleModalVisible(true)}>
                <Text style={styles.listText}>{lifestyleFormatted}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.modalContainer}>
            <Modal animationType='slide' transparent={true} visible={lifestyleModalVisible}>
              <View style={styles.modalStyle}>
                <Picker 
                  style={{backgroundColor: colors.white, width: wp(84)}}
                  itemStyle={styles.listText} selectedValue='Средняя активность'
                  pickerData={lifestyles} onValueChange={value => {setLifestyleFormatted(value), setLifestyle(createLifestyle(value))}} />
                <TouchableOpacity style={{width: wp(20), height: hp(3), justifyContent: 'center'}}
                  onPress={() => setLifestyleModalVisible(!lifestyleModalVisible)}>
                  <Text style={[styles.listText, lifestyleModalVisible && {textAlign: 'center'}]}>OK</Text>
                </TouchableOpacity>
              </View>
            </Modal>
        </View>
      </View>
      <View style={styles.block}>
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
                  style={{backgroundColor: colors.white, width: wp(84)}}
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
      <TouchableOpacity style={[globalStyles.mainButton, {marginTop: hp(4.98)}]}
        onPress={countProfileStatistics}>
        <Text style={styles.buttonText}>Сохранить изменения</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

/*
<DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={{width: wp(81.3), height: hp(4.98), borderColor: colors.white}}
      showArrowIcon={false}
    />

    <SelectList 
        setSelected={(val) => setLifestyle(val)} 
        data={lifestyles} 
        save="value"
        search={false}
        arrowicon={false}
        boxStyles={{width: wp(81.3), height: hp(5.98), borderColor: colors.white}}
        dropdownTextStyles={styles.listText}
        dropdownStyles={{width: wp(81.3), borderColor: colors.white}}
        defaultOption={{ key:'average', value:'Средняя активность' }} 
        inputStyles={styles.listText}
      
    />
*/

const styles = StyleSheet.create({
  block: {
    // borderWidth: 1,
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
    borderWidth: 0.3,
    borderColor: colors.separator,
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
})