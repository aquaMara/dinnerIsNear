import { ScrollView, Dimensions, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Keyboard } from 'react-native';
import { Platform } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
// import SwitchSelector from "react-native-switch-selector";
// import ScrollPicker from 'react-native-wheel-scrollview-picker';
// import ScrollPicker from 'react-native-scroll-wheel-picker';
import { useFonts } from 'expo-font';
import { Linking } from 'react-native';
import { firebaseConfig } from '../../firebase-config';
import firebase from "firebase/compat";
import { globalStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from 'react-native-wheel-pick';
import { Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import SwitchSelector from "react-native-switch-selector";
import { Alert } from 'react-native';

const { height } = Dimensions.get('screen');

export default function ProfileStepOne({ navigation, route }) {

  const userId = route.params.userId;
  //const userId = 'ff';
  //const phoneNumber = 6;
  const phoneNumber = route.params.phoneNumber;
  const [nameData, setNameData] = useState('');
  const [gender, setGender] = useState('female');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateOfBirthFormatted, setDateOfBirthFormatted] = useState('2023/1/1');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [lifestyle, setLifestyle] = useState('average');
  const [lifestyleFormatted, setLifestyleFormatted] = useState('Средняя активность');

  const [birthdayModalVisible, setBirthdayModalVisible] = useState(false);
  const [lifestyleModalVisible, setLifestyleModalVisible] = useState(false);

  const lifestyles = [
    'Минимальная активность', 'Небольшая активность', 'Средняя активность',
    'Активность выше среднего', 'Повышенная активность', 
    'Высокая активность', 'Очень высокая активность'];

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

  const setDate = (event, date) => {
    var mm = date.getMonth() + 1;
    setDateOfBirth(date);
    setDateOfBirthFormatted(date.getFullYear() + '/' + mm + '/' + date.getDate());
  };

  const toNextStep = () => {
    const stepOne = {userId, phoneNumber, 'name': nameData, gender, dateOfBirthFormatted, weight, height, 'lifestyle': lifestyle};
    if (nameData.trim() === '' && weight.trim() === '' && height.trim() === '') {
      Alert.alert(
        'Незаполненные поля ввода',
        'Проверьте, пожалуйста, заполнили ли вы имя и фамилию, рост, вес',
        [
          {
            text: 'OK',
            style: 'default',
          },
        ],
      );
    } else {
      navigation.navigate('StepTwo', {stepOne: stepOne})
    }
  }

  useEffect(() => {

  }, [])

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
  });
    
  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalStyles.container}>
    <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={[styles.block, {marginTop: hp(2.37)}]}>
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
                  style={{borderRadius: wp(5.13)}}
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
                  style={{backgroundColor: colors.white, width: wp(84), borderRadius: wp(5.13)}}
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
      <TouchableOpacity onPress={toNextStep} style={[globalStyles.mainButton, {marginTop: hp(3.08)}]}>
        <Text style={styles.buttonText}>Следующий шаг</Text>
      </TouchableOpacity>
      <View style={styles.stepBox}>
        <Text style={[styles.labelText, styles.stepText]}>Шаг 1 из 2</Text>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

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