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
import { Picker, DatePicker } from 'react-native-wheel-pick';
import { Modal } from 'react-native';
import { useIsFocused } from "@react-navigation/native";

import SwitchSelector from "react-native-switch-selector";

const { height } = Dimensions.get('screen');

export default function ProfileStepOne({ navigation, route }) {
  const isFocusedHistory = useIsFocused();

  const userId = route.params.userId;
  const phoneNumber = route.params.phoneNumber;
  const [name, setName] = useState('');
  const [gender, setGender] = useState('female');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const lifestyles = [
    'Минимальная активность', 'Небольшая активность', 'Средняя активность',
    'Активность выше среднего', 'Повышенная активность', 
    'Высокая активность', 'Очень высокая активность'];
  const [lifestyle, setLifestyle] = useState(lifestyles[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const setResult = () => {
    let lf;
    switch (lifestyle) {
        case 'Минимальная активность': lf = 'minimum'; break;
        case 'Небольшая активность':  lf = 'little'; break;
        case 'Средняя активность':  lf = 'average'; break;
        case 'Активность выше среднего':  lf = 'higherThanAverage'; break;
        case 'Повышенная активность':  lf = 'increased'; break;
        case 'Высокая активность': lf = 'high'; break;
        case 'Очень высокая активность': lf = 'veryHigh'; break;
        default: lf = 'min'; break;
    }
    const stepOne = {userId, phoneNumber, name, gender, dateOfBirth, weight, height, lifestyle : lf};
    // () => navigation.navigate('StepTwo', {userId: userId})
    navigation.navigate('StepTwo', {stepOne: stepOne})
  }

  useEffect(() => {

  }, [])

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
  });
    
  if (!fontsLoaded) {
    //return null;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalStyles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={[globalStyles.container, styles.temp]}>
      <SafeAreaView style={globalStyles.inner}>
        <View style={styles.labelBox}>
            <Text style={styles.labelText}>Имя Фамилия</Text>
        </View>
        <TextInput style={styles.textInput} value={name}
            placeholder='Введите имя и фамилию' placeholderTextColor={'#8A8A8E'}
            onChangeText={n => setName(n)} />  
        <View style={styles.labelBox}>
            <Text style={styles.labelText}>Пол</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
            <SwitchSelector style={{  width: wp(91.8) }}
                initial={0}
                onPress={g => setGender(g) }
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
                    { label: "Женский", value: "female" },
                    { label: "Мужской", value: "male" }
                ]} />
        </View>
        <View style={styles.labelBox}>
            <Text style={styles.labelText}>Дата рождения</Text>
        </View>
        <TextInput style={styles.textInput} value={dateOfBirth}
            placeholder='Введите дату рождения' placeholderTextColor={'#8A8A8E'}
            onChangeText={dob => setDateOfBirth(dob)} />          
        <View style={styles.labelBox}>
            <Text style={styles.labelText}>Рост</Text>
        </View>
        <TextInput style={styles.textInput} value={height}
            placeholder='Введите свой рост в см' placeholderTextColor={'#8A8A8E'}
            onChangeText={h => setHeight(h)} />        
        <View style={styles.labelBox}>
            <Text style={styles.labelText}>Вес</Text>
        </View>
        <TextInput style={styles.textInput} value={weight}
            placeholder='Введите свой вес в кг' placeholderTextColor={'#8A8A8E'}
            onChangeText={w => setWeight(w)} />
        <View style={styles.labelBox}>
            <Text style={styles.labelText}>Активность</Text>
        </View>
        <View style={styles.toggleBlock}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={[ styles.toggleText, {width: wp(76.7) } ]}>{lifestyle}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.modalContainer}>
            <Modal animationType="slide" transparent={true} visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible) }} >
                <View style={styles.modalStyle}>
                    <Picker style={styles.pickerStyle} selectedValue={lifestyles[0]} 
                        pickerData={lifestyles}
                        itemStyle={styles.toggleText}
                        onValueChange={(value) => { setLifestyle(value); setModalVisible(false) }} />
                </View>
            </Modal>
        </View>
      </SafeAreaView>
      <TouchableOpacity onPress={setResult}
        style={globalStyles.mainButton}>
        <Text style={styles.buttonText}>Следующий шаг</Text>
      </TouchableOpacity>
      <View style={styles.stepBox}>
        <Text style={[styles.labelText, styles.stepText]}>Шаг 1 из 2</Text>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        marginTop: hp(10),
    },
    modalStyle: {
        width: wp (95),
        height: hp(40),
        marginTop: hp(30),
        backgroundColor: colors.white,
        borderColor: colors.green,
        borderWidth: 0.26,
        alignItems: "center",
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    pickerStyle: {
        width: wp(60),
        height: hp(8.98),
        backgroundColor: 'white',
    },
    labelBox: {
        height: hp(1.9),
        width: wp(40.77),
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
    textInput : {
        width: wp(95.9),
        height: hp(4.45),
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
        //marginBottom: hp(1.03),
    },  
    stepText: {
        textAlign: 'center',
    },
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
    toggleText: {
        fontSize: RFValue(17, height),
        fontFamily: 'SF-Pro-Regular',
    },
    toggleBlock: {
        height: hp(4.98),
        width: wp(95.9),
        marginLeft: wp(4.1),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: colors.separator,
        borderBottomWidth: wp(0.26),
    },
})