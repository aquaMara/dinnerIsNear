import { ScrollView, Dimensions, KeyboardAvoidingView, SafeAreaView, Image, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Keyboard } from 'react-native';
import { Platform } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import SwitchSelector from "react-native-switch-selector";
import { Switch } from 'react-native';
//import ScrollPicker from 'react-native-wheel-scrollview-picker';
//import ScrollPicker from 'react-native-scroll-wheel-picker';
//import WheelPickerExpo from 'react-native-wheel-picker-expo';
//import { Picker } from 'react-native-wheel-pick';
//import {Picker} from '@react-native-picker/picker';
import { useFonts } from 'expo-font';
import { Linking } from 'react-native';
import { firebaseConfig } from '../../firebase-config';
import firebase from "firebase/compat";
import { globalStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Picker } from 'react-native-wheel-pick';
import { Modal } from 'react-native';
import { countCalories } from '../../functions/CountCalories';
import { countPFC } from '../../functions/CountPFC';
  

const { height } = Dimensions.get('screen');
export default function ProfileStepTwo({ navigation, route }) {

    const stepOne = route.params.stepOne;
    //const stepOne = 'route.params.stepOne';
    console.log('route 2', stepOne);

    const aims = ['Сбросить вес', 'Поддержать форму', 'Набрать вес'];
    const [aim, setAim] = useState(aims[0]);
    const [modalVisible, setModalVisible] = useState(false);
    const [weightLoss, setWeightLoss] = useState('');

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

    const [numberOfMeals, setNumberOfMeals] = useState(1);

    const [CI, setCI] = useState(null);

    const setResult = () => {
        const {userId, phoneNumber, name, gender, dateOfBirth, weight, height, lifestyle} = stepOne;
        let am;
        switch (aim) {
            case 'Сбросить вес': am = 'loseWeight'; break;
            case 'Поддержать форму':  am = 'maintainWeight'; break;
            case 'Набрать вес':  am = 'gainWeight'; break;
            default: am = 'maintainWeight'; break;
        }
        const stepTwo = {
            userId, name, gender, dateOfBirth, weight, height,
            aim : am, weightLoss, numberOfMeals, veganism, vegetarianism, 
            fish, meat, nuts, sugar, gluten, lactose, mushrooms,
            steamed, boiled, stewed, fried, deepFried, roasted, dried};
        console.log(stepTwo);
        //navigation.navigate('StepTwo', {userId: userId});
        firebase.firestore().collection('users').doc(userId)
            .set({
                name,
                gender,
                dateOfBirth,
                weight,
                height,
                lifestyle,
                aim : am,
                weightLoss, numberOfMeals, veganism, vegetarianism, 
                fish, meat, nuts, sugar, gluten, lactose, mushrooms,
                steamed, boiled, stewed, fried, deepFried, roasted, dried
            // and so on 
            }) 
            .then(() => {
                console.log('User is added to firestore');
                const calorieIntake = countCalories(gender, weight, height, dateOfBirth, lifestyle, am, weightLoss);
                setCI(calorieIntake);
                const caloriesForEachMeal = parseInt(calorieIntake / numberOfMeals, 10);
                const {protein, fats, carbohydrates} = countPFC(am, calorieIntake);
                firebase.firestore().collection('calorie_plan').doc(userId)
                    .set({
                        calorieIntake, numberOfMeals, caloriesForEachMeal, protein, fats, carbohydrates
                    })
                    .then(() => {console.log('test', calorieIntake); navigation.navigate('CalorieCount', {cl: calorieIntake})})
                    .catch(err => console.log('ProfileStepTwo caloriePlan error '));
            // do something like logging 'user registered' 
            }).catch(err => console.log('ProfileStepTwo ', err));
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
        <View style={styles.labelBox}>
            <Text style={styles.labelText}>Цель</Text>
        </View>
        <View style={styles.toggleBlock}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={[ styles.toggleText, {width: wp(76.7)} ]}>{aim}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.modalContainer}>
            <Modal animationType="slide" transparent={true} visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible) }} >
                <View style={styles.modalStyle}>
                    <Picker style={styles.pickerStyle} selectedValue={aims[0]} 
                        pickerData={aims}
                        itemStyle={styles.toggleText}
                        onValueChange={(value) => { setAim(value); setModalVisible(false) }} />
                </View>
            </Modal>
        </View>
        {   aim === 'Сбросить вес' ?
            (<View style={{ alignItems: 'center' }}>
            <SwitchSelector style={{  width: wp(91.8) }}
                initial={0}
                onPress={wl => setWeightLoss(wl) }
                textColor={colors.black}
                selectedColor={colors.white}
                buttonColor={colors.green}
                borderColor='rgba(118, 118, 128, 0)'
                backgroundColor='rgba(118, 118, 128, 0.12)'
                hasPadding
                borderRadius={hp(1.07)}
                borderWidth={hp(0.1)}
                height={hp(4.59)}
                options={[
                    { label: 'Плавное', value: "smooth" },
                    { label: "Обычное", value: "regular" },
                    { label: "Активное", value: "active" },
                ]} />
            </View>) : null
        }
        <View style={styles.labelBox}>
            <Text style={styles.labelText}>Количество приёмов пищи</Text>
        </View>
        <View style={styles.counterContainer}>
            <Text style={[styles.toggleText, {width: wp(60)}]}>Приёмы пищи</Text>
            <View style={styles.counterInner}>
                <TouchableOpacity onPress={() => setNumberOfMeals(previousState => previousState - 1)} disabled={numberOfMeals <= 1}>
                    {numberOfMeals <= 1 
                    ? (<Image style={styles.sign} source={require('../../assets/images/minusGray.png')}/>) 
                    : (<Image style={styles.sign} source={require('../../assets/images/minusGreen.png')}/>) }
                </TouchableOpacity>
                <View style={styles.counterText}>
                    <Text style={styles.toggleText}>{numberOfMeals}</Text>
                </View>
                <TouchableOpacity onPress={() => setNumberOfMeals(previousState => previousState + 1)} disabled={numberOfMeals >= 6}>
                {numberOfMeals >= 6 
                    ? (<Image style={styles.sign} source={require('../../assets/images/plusGray.png')}/>) 
                    : (<Image style={styles.sign} source={require('../../assets/images/plusGreen.png')}/>) }
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.labelBox}>
            <Text style={styles.labelText}>Система питания</Text>
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.toggleText, {width: wp(76.7)}]}>Веганство</Text>
            <Switch style={{ marginLeft: wp(2.56) }}
                trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: 'rgba(120, 120, 128, 0.16)' }}
                thumbColor={veganism ? colors.green : colors.white}
                ios_backgroundColor='rgba(120, 120, 128, 0.16)'
                onValueChange={() => setVeganism(previousState => !previousState)}
                value={veganism}
            />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.toggleText, {width: wp(76.7)}]}>Вегетаринство</Text>
            <Switch style={{ marginLeft: wp(2.56) }}
                trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(120, 120, 128, 0.16)" }}
                thumbColor={vegetarianism ? colors.green : colors.white}
                onValueChange={() => setVegetarianism(previousState => !previousState)}
                value={vegetarianism}
            />
        </View>
        <View style={styles.labelBox}>
            <Text style={styles.labelText}>Исключить продукты из рациона</Text>
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.toggleText, {width: wp(76.7)}]}>Рыба</Text>
            <Switch style={{ marginLeft: wp(2.56) }}
                trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(120, 120, 128, 0.16)" }}
                thumbColor={fish ? colors.green : colors.white}
                onValueChange={() => setFish(previousState => !previousState)}
                value={fish}
            />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.toggleText, {width: wp(76.7)}]}>Мясо</Text>
            <Switch style={{ marginLeft: wp(2.56) }}
                trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(120, 120, 128, 0.16)" }}
                thumbColor={meat ? colors.green : colors.white}
                onValueChange={() => setMeat(previousState => !previousState)}
                value={meat}
            />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.toggleText, {width: wp(76.7)}]}>Орехи</Text>
            <Switch style={{ marginLeft: wp(2.56) }}
                trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(120, 120, 128, 0.16)" }}
                thumbColor={nuts ? colors.green : colors.white}
                onValueChange={() => setNuts(previousState => !previousState)}
                value={nuts}
            />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.toggleText, {width: wp(76.7)}]}>Сахар</Text>
            <Switch style={{ marginLeft: wp(2.56) }}
                trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(120, 120, 128, 0.16)" }}
                thumbColor={sugar ? colors.green : colors.white}
                onValueChange={() => setSugar(previousState => !previousState)}
                value={sugar}
            />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.toggleText, {width: wp(76.7)}]}>Глютен</Text>
            <Switch style={{ marginLeft: wp(2.56) }}
                trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(120, 120, 128, 0.16)" }}
                thumbColor={gluten ? colors.green : colors.white}
                onValueChange={() => setGluten(previousState => !previousState)}
                value={gluten}
            />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.toggleText, {width: wp(76.7)}]}>Лактоза</Text>
            <Switch style={{ marginLeft: wp(2.56) }}
                trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(120, 120, 128, 0.16)" }}
                thumbColor={lactose ? colors.green : colors.white}
                onValueChange={() => setLactose(previousState => !previousState)}
                value={lactose}
            />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.toggleText, {width: wp(76.7)}]}>Грибы</Text>
            <Switch style={{ marginLeft: wp(2.56) }}
                trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(120, 120, 128, 0.16)" }}
                thumbColor={mushrooms ? colors.green : colors.white}
                onValueChange={() => setMushrooms(previousState => !previousState)}
                value={mushrooms}
            />
        </View>
        <View style={styles.labelBox}>
            <Text style={styles.labelText}>Исключить способы приготовления</Text>
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.toggleText, {width: wp(76.7)}]}>На пару</Text>
            <Switch style={{ marginLeft: wp(2.56) }}
                trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(120, 120, 128, 0.16)" }}
                thumbColor={steamed ? colors.green : colors.white}
                onValueChange={() => setSteamed(previousState => !previousState)}
                value={steamed}
            />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.toggleText, {width: wp(76.7)}]}>Варёное</Text>
            <Switch style={{ marginLeft: wp(2.56) }}
                trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(120, 120, 128, 0.16)" }}
                thumbColor={boiled ? colors.green : colors.white}
                onValueChange={() => setBoiled(previousState => !previousState)}
                value={boiled}
            />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.toggleText, {width: wp(76.7)}]}>Тушёное</Text>
            <Switch style={{ marginLeft: wp(2.56) }}
                trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(120, 120, 128, 0.16)" }}
                thumbColor={stewed ? colors.green : colors.white}
                onValueChange={() => setStewed(previousState => !previousState)}
                value={stewed}
            />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.toggleText, {width: wp(76.7)}]}>Жареное</Text>
            <Switch style={{ marginLeft: wp(2.56) }}
                trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(120, 120, 128, 0.16)" }}
                thumbColor={fried ? colors.green : colors.white}
                onValueChange={() => setFried(previousState => !previousState)}
                value={fried}
            />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.toggleText, {width: wp(76.7)}]}>Во фритюре</Text>
            <Switch style={{ marginLeft: wp(2.56) }}
                trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(120, 120, 128, 0.16)" }}
                thumbColor={deepFried ? colors.green : colors.white}
                onValueChange={() => setDeepFried(previousState => !previousState)}
                value={deepFried}
            />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.toggleText, {width: wp(76.7)}]}>Жареное на огне</Text>
            <Switch style={{ marginLeft: wp(2.56) }}
                trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(120, 120, 128, 0.16)" }}
                thumbColor={roasted ? colors.green : colors.white}
                onValueChange={() => setRoasted(previousState => !previousState)}
                value={roasted}
            />
        </View>
        <View style={styles.toggleBlock}>
            <Text style={[styles.toggleText, {width: wp(76.7)}]}>Вяленое</Text>
            <Switch style={{ marginLeft: wp(2.56) }}
                trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(120, 120, 128, 0.16)" }}
                thumbColor={dried ? colors.green : colors.white}
                onValueChange={() => setDried(previousState => !previousState)}
                value={dried}
            />
        </View>
        <TouchableOpacity onPress={setResult}
            style={[globalStyles.mainButton, {marginTop: hp(3.08)}]}>
            <Text style={styles.buttonText}>Завершить</Text>
        </TouchableOpacity>
        <View style={styles.stepBox}>
            <Text style={[styles.labelText, styles.stepText]}>Шаг 2 из 2</Text>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(2.49),
    },
    modalStyle: {
        width: wp (70),
        height: hp(35),
        marginTop: hp(10),
        backgroundColor: colors.white,
        borderColor: colors.green,
        borderWidth: 0.26,
        borderRadius: wp(5.1),
        paddingVertical: hp(1.4),
        alignItems: 'center',
        alignSelf: 'center',
    },
    pickerStyle: {
        width: wp(60),
        height: hp(8.98),
        backgroundColor: 'white',
    },
    toggleBlock: {
        height: hp(4.98),
        width: wp(95.9),
        marginLeft: wp(4.1),
        display: 'flex',
        flexDirection: 'row',
        //alignContent: 'center',
        alignItems: 'center',
        borderBottomColor: colors.separator,
        borderBottomWidth: wp(0.26),
    },
    toggleText: {
        fontSize: RFValue(17, height),
        fontFamily: 'SF-Pro-Medium',
        lineHeight: hp(2.4),
    },
    labelBox: {
        height: hp(1.9),
        width: wp(65.77),
        marginLeft: wp(4.1),
        marginTop: hp(2.49),
        marginBottom: hp(1.78),
    },
    labelText: {
        fontSize: RFValue(13, height),
        fontFamily: 'SF-Pro-Regular',
        opacity: 0.6,
        lineHeight: hp(1.9),
    },
    counterContainer: {
        height: hp(4.98),
        marginLeft: wp(4.1),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: colors.separator,
        borderBottomWidth: wp(0.26),
    },
    counterInner: {
        height: hp(4.98),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterText: {
        width: wp(12.82),
        alignItems: 'center',
        marginHorizontal: wp(4.36)
    },
    sign: {
        height: hp(2.5),
        width: hp(2.6)
    },
    plusSign: {
        fontSize: RFValue(40, height),
        fontFamily: 'SF-Pro-Bold',
    },
    minusSign: {
        fontSize: RFValue(50, height),
        fontFamily: 'SF-Pro-Medium',
    },
    textInput: {
        width: wp(95.9),
        height: hp(5.45),
        marginLeft: wp(4.1),
        marginTop: hp(1.78),
        marginBottom: hp(3.55),
        lineHeight: hp(2.4),
        fontSize: RFValue(17, height),
        fontFamily: 'SF-Pro-Regular',
        borderBottomColor: colors.separator,
        borderBottomWidth: wp(0.26),
    },
    buttonText: {
      color: '#fff',
      fontSize: RFValue(17, height),
      lineHeight: hp(2.4),
      fontFamily: 'SF-Pro-Medium',
      textAlign: 'center',
    },
    stepBox: {
        marginTop: hp(1.54),
        // marginBottom: hp(5.57),
        marginBottom: hp(4.03),
    },
    stepText: {
        textAlign: 'center',
    }
})
/*
<TouchableOpacity onPress={() => setHidden(prev => !prev)} >
        { hidden &&
        (
            <Picker
            style={{ backgroundColor: 'white', width: wp(60), height: hp(8.98), marginTop: -50}}
            selectedValue='item4'
            pickerData={['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7']}
            onValueChange={value => { console.log(value) }}
            />
        )
        }
        </TouchableOpacity>
        */