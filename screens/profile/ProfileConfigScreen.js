import { ScrollView, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { globalStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SwitchSelector from "react-native-switch-selector";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateModal from './components/DateModal';
import { DatePicker } from 'react-native-wheel-pick';
import { SelectList } from 'react-native-dropdown-select-list';

import { Picker } from 'react-native-wheel-pick';

import DropDownPicker from 'react-native-dropdown-picker';

const { height } = Dimensions.get('screen');

export default function ProfileConfigScreen() {

  const [name, setName] = useState('');
  const [gender, setGender] = useState('female');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [lifestyle, setLifestyle] = useState('');

  const [visibility, setVisibility] = useState(false);
    const chooseMessage = (message) => {
        setVisibility(message);
    };


  const setDate = (event: DateTimePickerEvent, date: Date) => {
    const {
      type,
      nativeEvent: {timestamp},
    } = event;
    console.log(date)
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

  const [selected, setSelected] = React.useState("");
  const aims = ['Сбросить вес', 'Поддержать форму', 'Набрать вес'];
    const [aim, setAim] = useState(aims[0]);
    const [weightLoss, setWeightLoss] = useState('');
  
  const data = [
      {key:'1', value:'Mobiles'},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers'},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]
  const lifestyles = [
    {key:'minimum', value:'Минимальная активность'},
    {key:'little', value:'Небольшая активность'},
    {key:'average', value:'Средняя активность'},
    {key:'higherThanAverage', value:'Активность выше среднего'},
    {key:'increased', value:'Повышенная активность'},
    {key:'high', value:'Высокая активность'},
    {key:'veryHigh', value:'Очень высокая активность'}];

    const lifestyles2 = [
      'Минимальная активность', 'Небольшая активность', 'Средняя активность',
      'Активность выше среднего', 'Повышенная активность', 
      'Высокая активность', 'Очень высокая активность'];

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
        <TextInput style={styles.textInput} value={name}
            placeholder='Введите имя и фамилию' placeholderTextColor={colors.grey}
            onChangeText={n => setName(n)} />
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
        <DateTimePicker value={dateOfBirth} display="spinner" mode='date'
        style={{backgroundColor: 'white', color: 'blue', flex: 1, height: hp(6.8), borderWidth: 1}}
        minimumDate={new Date(1950, 0, 1)} 
        maximumDate={new Date(2030, 10, 20)}
        textColor={colors.black}
        themeVariant="light"
        locale="rus-RUS"
        onChange={setDate} dateFormat="dayofweek day month"
        />
        <DateTimePicker value={dateOfBirth} display="default" mode='date'
        style={{backgroundColor: 'white', color: 'blue', flex: 1, width: wp(29), height: hp(5)}}
        minimumDate={new Date(1950, 0, 1)} 
        maximumDate={new Date(2030, 10, 20)}
        textColor={colors.black}
        themeVariant="light"
        locale="ru-RUS"
        onChange={setDate} dateFormat="dayofweek day month"
        />
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
      </View>
      <View style={styles.block}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Цель</Text>
        </View>
        <Picker
          style={{ backgroundColor: colors.white, width: wp(90), 
            height: hp(5.98), backgroundColor: '#ffffff', 
            marginTop: hp(1.78), }}
          itemStyle={[styles.listText ,{backgroundColor: colors.white, height: hp(5.98), backgroundColor: 'white', textAlign: 'left', marginLeft: wp(-2)}]}
          selectedValue='item4'
          pickerData={aims}
          onValueChange={value => setAim(value)}
        />
      </View>

      <View style={styles.block}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Рост</Text>
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
      </View>


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
*/

const styles = StyleSheet.create({
  block: {
    borderWidth: 1,
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
    // marginBottom: hp(3.55),
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
  marginLeft: wp(-6),
},
})