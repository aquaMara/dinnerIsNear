import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TextInput, Modal, TouchableOpacity, Alert, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { colors } from '../../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


import GestureRecognizer from 'react-native-swipe-gestures';

import * as SecureStore from 'expo-secure-store';

const { height } = Dimensions.get('screen');

export default function DiagnosisScreen() {

  const [warningVisibility, setWarningVisibility] = useState(false);
  const [inputVisibility, setInputVisible] = useState(false);
  const [anotherDiagnosis, setAnotherDiagnosis] = useState('');
  const [marginVisibility, setMarginVisibility] = useState(false);

  const [noDiagnosis, setNoDiagnosis] = useState(true);
  const [akne, setAkne] = useState(false);
  const [anemia, setAnemia] = useState(false);
  const [gastrit, setGastrit] = useState(false);
  const [defitsytVitaminov, setDefitsytVitaminov] = useState(false);
  const [divertikulez, setDivertikulez] = useState(false);
  const [zagibPuzyrja, setZagibPuzyrja] = useState(false);
  const [insulinorezistentnost, setInsulinorezistentnost] = useState(false);
  const [metabolicheskijSindrom, setMetabolicheskijSindrom] = useState(false);
  const [noJelchnyjPuzyr, setNoJelchnyjPuzyr] = useState(false);
  const [noChitovidnajaJeleza, setNoChitovidnajaJeleza] = useState(false);
  const [pankreatit, setPankreatit] = useState(false);
  const [pankreaticheskijDiabet, setPankreaticheskijDiabet] = useState(false);
  const [povyshennajaKislotnost, setPovyshennajaKislotnost] = useState(false);
  const [ponizhennajaKislotnost, setPonizhennajaKislotnost] = useState(false);
  const [problemySKlapanami, setProblemySKlapanami] = useState(false);
  const [saharnyiDiabetOne, setSaharnyiDiabetOne] = useState(false);
  const [saharnyiDiabetTwo, setSaharnyiDiabetTwo] = useState(false);
  const [sindromVolframa, setSindromVolframa] = useState(false);
  const [srk, setSrk] = useState(false);
  const [helicobacter, setHelicobacter] = useState(false);
  const [holetsestit, setHoletsestit] = useState(false);
  const [jazva, setJazva] = useState(false);
  const [another, setAnother] = useState(false);

  const setNoDiagnosisSecureStore = async (val) => {
      setNoDiagnosis(val);
      await SecureStore.setItemAsync('noDiagnosis', val == true ? '1' : '0' );
  }
  const setAkneSecureStore = async (val) => {
      if (val) {
        setWarningVisibility(true)
      }
      setAkne(val);
      await SecureStore.setItemAsync('akne', val == true ? '1' : '0');
  }
  const setAnemiaSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setAnemia(val);
      await SecureStore.setItemAsync('anemia', val == true ? '1' : '0' );
  }
  const setGastritSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setGastrit(val);
      await SecureStore.setItemAsync('gastrit', val == true ? '1' : '0' );
  }
  const setDefitsytVitaminovSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setDefitsytVitaminov(val);
      await SecureStore.setItemAsync('defitsytVitaminov', val == true ? '1' : '0' );
  }
  const setDivertikulezSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setDivertikulez(val);
      await SecureStore.setItemAsync('divertikulez', val == true ? '1' : '0' );
  }
  const setZagibPuzyrjaSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setZagibPuzyrja(val);
      await SecureStore.setItemAsync('zagibPuzyrja', val == true ? '1' : '0' );
  }
  const setInsulinorezistentnostSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setInsulinorezistentnost(val);
      await SecureStore.setItemAsync('insulinorezistentnost', val == true ? '1' : '0' );
  }
  const setMetabolicheskijSindromSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setMetabolicheskijSindrom(val);
      await SecureStore.setItemAsync('metabolicheskijSindrom', val == true ? '1' : '0' );
  }
  const setNoJelchnyjPuzyrSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setNoJelchnyjPuzyr(val);
      await SecureStore.setItemAsync('noJelchnyjPuzyr', val == true ? '1' : '0' );
  }
  const setNoChitovidnajaJelezaSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setNoChitovidnajaJeleza(val);
      await SecureStore.setItemAsync('noChitovidnajaJeleza', val == true ? '1' : '0' );
  }
  const setPankreatitSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setPankreatit(val);
      await SecureStore.setItemAsync('pankreatit', val == true ? '1' : '0' );
  }
  const setPankreaticheskijDiabetSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setPankreaticheskijDiabet(val);
      await SecureStore.setItemAsync('pankreaticheskijDiabet', val == true ? '1' : '0' );
  }
  const setPovyshennajaKislotnostSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setPovyshennajaKislotnost(val);
      await SecureStore.setItemAsync('povyshennajaKislotnost', val == true ? '1' : '0' );
  }
  const setPonizhennajaKislotnostSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setPonizhennajaKislotnost(val);
      await SecureStore.setItemAsync('ponizhennajaKislotnost', val == true ? '1' : '0' );
  }
  const setProblemySKlapanamiSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setProblemySKlapanami(val);
      await SecureStore.setItemAsync('problemySKlapanami', val == true ? '1' : '0' );
  }
  const setSaharnyiDiabetOneSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setSaharnyiDiabetOne(val);
      await SecureStore.setItemAsync('saharnyiDiabetOne', val == true ? '1' : '0' );
  }
  const setSaharnyiDiabetTwoSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setSaharnyiDiabetTwo(val);
      await SecureStore.setItemAsync('saharnyiDiabetTwo', val == true ? '1' : '0' );
  }
  const setSindromVolframaSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setSindromVolframa(val);
      await SecureStore.setItemAsync('sindromVolframa', val == true ? '1' : '0' );
  }
  const setSrkSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setSrk(val);
      await SecureStore.setItemAsync('srk', val == true ? '1' : '0' );
  }
  const setHelicobacterSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setHelicobacter(val);
      await SecureStore.setItemAsync('helicobacter', val == true ? '1' : '0' );
  }
  const setHoletsestitSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setHoletsestit(val);
      await SecureStore.setItemAsync('holetsestit', val == true ? '1' : '0' );
  }
  const setJazvaSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setJazva(val);
      await SecureStore.setItemAsync('jazva', val == true ? '1' : '0' );
  }
  const setAnotherSecureStore = async (val) => {
    if (val) {
        setWarningVisibility(true)
      }
      setAnother(val);
      await SecureStore.setItemAsync('another', val == true ? '1' : '0' );
  }

  const setAnotherDiagnosisSecureStore = async () => {
    if (anotherDiagnosis.trim() != '') {
        setWarningVisibility(true);
        await SecureStore.setItemAsync('anotherDiagnosis', JSON.stringify(anotherDiagnosis.trim()));
    }
  }

  useEffect(() => {
      (async () => {

        let x = await SecureStore.getItemAsync('another');
        if (x != null) {
          setNoDiagnosis( await SecureStore.getItemAsync('noDiagnosis') == "1" ? true : false);
          setAkne( await SecureStore.getItemAsync('akne') == "1" ? true : false);
          setAnemia( await SecureStore.getItemAsync('anemia') == "1" ? true : false);
          setGastrit( await SecureStore.getItemAsync('gastrit') == "1" ? true : false);
          setDefitsytVitaminov( await SecureStore.getItemAsync('defitsytVitaminov') == "1" ? true : false);
          setDivertikulez( await SecureStore.getItemAsync('divertikulez') == "1" ? true : false);
          setZagibPuzyrja( await SecureStore.getItemAsync('zagibPuzyrja') == "1" ? true : false);
          setInsulinorezistentnost( await SecureStore.getItemAsync('insulinorezistentnost') == "1" ? true : false);
          setMetabolicheskijSindrom( await SecureStore.getItemAsync('metabolicheskijSindrom') == "1" ? true : false);
          setNoJelchnyjPuzyr( await SecureStore.getItemAsync('noJelchnyjPuzyr') == "1" ? true : false);
          setNoChitovidnajaJeleza( await SecureStore.getItemAsync('noChitovidnajaJeleza') == "1" ? true : false);
          setPankreatit( await SecureStore.getItemAsync('pankreatit') == "1" ? true : false);
          setPankreaticheskijDiabet( await SecureStore.getItemAsync('pankreaticheskijDiabet') == "1" ? true : false);
          setPovyshennajaKislotnost( await SecureStore.getItemAsync('povyshennajaKislotnost') == "1" ? true : false);
          setPonizhennajaKislotnost( await SecureStore.getItemAsync('ponizhennajaKislotnost') == "1" ? true : false);
          setProblemySKlapanami( await SecureStore.getItemAsync('problemySKlapanami') == "1" ? true : false);
          setSaharnyiDiabetOne( await SecureStore.getItemAsync('saharnyiDiabetOne') == "1" ? true : false);
          setSaharnyiDiabetTwo( await SecureStore.getItemAsync('saharnyiDiabetTwo') == "1" ? true : false);
          setSindromVolframa( await SecureStore.getItemAsync('sindromVolframa') == "1" ? true : false);
          setSrk( await SecureStore.getItemAsync('srk') == "1" ? true : false);
          setHelicobacter( await SecureStore.getItemAsync('helicobacter') == "1" ? true : false);
          setHoletsestit( await SecureStore.getItemAsync('holetsestit') == "1" ? true : false);
          setJazva( await SecureStore.getItemAsync('jazva') == "1" ? true : false);
          setAnother( await SecureStore.getItemAsync('another') == "1" ? true : false);
        }      
    
      })();
    }, [])

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
  });
        
  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{flex: 1}}>
    <ScrollView style={{backgroundColor: colors.white}}>
        {warningVisibility && (
            <GestureRecognizer onSwipeLeft={() => setWarningVisibility(false)}>
                <View style={{width: wp(91.8), height: hp(8.63), alignSelf: 'center',
                    borderRadius: wp(5.13), borderColor: colors.red, borderWidth: wp(1.03),
                    alignItems: 'center', justifyContent: 'center', marginTop: hp(1.78)}}>
                    <View style={{width: wp(83.59), height: hp(4.83)}}>
                        <Text style={{fontSize: RFValue(15, height), fontFamily: 'SF-Pro-Regular',
                            color: colors.black, lineHeight: hp(2.12), textAlign: 'justify'}}>
                            Выбор диагноза доступен только после консультации с нутрициологом</Text>
                    </View>
                </View>
            </GestureRecognizer>
        )}
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setNoDiagnosisSecureStore(!noDiagnosis)}>
            <Text style={[styles.listText]}>Отстутствует</Text>
            {noDiagnosis && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setAkneSecureStore(!akne)}>
            <Text style={[styles.listText]}>Акне</Text>
            {akne && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setAnemiaSecureStore(!anemia)}>
            <Text style={[styles.listText]}>Анемия (дефицит железа)</Text>
            {anemia && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setGastritSecureStore(!gastrit)}>
            <Text style={[styles.listText]}>Гастрит</Text>
            {gastrit && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setDefitsytVitaminovSecureStore(!defitsytVitaminov)}>
            <Text style={[styles.listText]}>Дефицит витаминов</Text>
            {defitsytVitaminov && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setDivertikulezSecureStore(!divertikulez)}>
            <Text style={[styles.listText]}>Дивертикулез</Text>
            {divertikulez && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setZagibPuzyrjaSecureStore(!zagibPuzyrja)}>
            <Text style={[styles.listText]}>Загиб желчного пузыря</Text>
            {zagibPuzyrja && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setInsulinorezistentnostSecureStore(!insulinorezistentnost)}>
            <Text style={[styles.listText]}>Инсулинорезистентность</Text>
            {insulinorezistentnost && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setMetabolicheskijSindromSecureStore(!metabolicheskijSindrom)}>
            <Text style={[styles.listText]}>Метаболический синдром</Text>
            {metabolicheskijSindrom && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setNoJelchnyjPuzyrSecureStore(!noJelchnyjPuzyr)}>
            <Text style={[styles.listText]}>Отсутствует желчный пузырь</Text>
            {noJelchnyjPuzyr && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setNoChitovidnajaJelezaSecureStore(!noChitovidnajaJeleza)}>
            <Text style={[styles.listText]}>Отсутствует щитовидная железа</Text>
            {noChitovidnajaJeleza && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setPankreatitSecureStore(!pankreatit)}>
            <Text style={[styles.listText]}>Панкреатит</Text>
            {pankreatit && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setPankreaticheskijDiabetSecureStore(!pankreaticheskijDiabet)}>
            <Text style={[styles.listText]}>Панкреатический диабет</Text>
            {pankreaticheskijDiabet && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setPovyshennajaKislotnostSecureStore(!povyshennajaKislotnost)}>
            <Text style={[styles.listText]}>Повышенная кислотность желудка</Text>
            {povyshennajaKislotnost && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setPonizhennajaKislotnostSecureStore(!ponizhennajaKislotnost)}>
            <Text style={[styles.listText]}>Пониженная кислотность желудка</Text>
            {ponizhennajaKislotnost && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setProblemySKlapanamiSecureStore(!problemySKlapanami)}>
            <Text style={[styles.listText]}>Проблемы с клапанами по жкт</Text>
            {problemySKlapanami && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setSaharnyiDiabetOneSecureStore(!saharnyiDiabetOne)}>
            <Text style={[styles.listText]}>Сахарный диабет 1 типа </Text>
            {saharnyiDiabetOne && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setSaharnyiDiabetTwoSecureStore(!saharnyiDiabetTwo)}>
            <Text style={[styles.listText]}>Сахарный диабет 2 типа</Text>
            {saharnyiDiabetTwo && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setSindromVolframaSecureStore(!sindromVolframa)}>
            <Text style={[styles.listText]}>Синдром Вольфрама</Text>
            {sindromVolframa && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setSrkSecureStore(!srk)}>
            <Text style={[styles.listText]}>СРК (синдром разраженного кишечника)</Text>
            {srk && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setHelicobacterSecureStore(!helicobacter)}>
            <Text style={[styles.listText]}>Хеликобактер пилори</Text>
            {helicobacter && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setHoletsestitSecureStore(!holetsestit)}>
            <Text style={[styles.listText]}>Холецистит</Text>
            {holetsestit && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleBlock} onPress={() => setJazvaSecureStore(!jazva)}>
            <Text style={[styles.listText]}>Язва желудка</Text>
            {jazva && <Image style={styles.diagnosisPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>}
      </TouchableOpacity>
      <TouchableOpacity style={[styles.toggleBlock]} onPress={() => {setInputVisible(prev => !prev); setWarningVisibility(true)}}>
            <Text style={[styles.listText]}>Другое</Text>
      </TouchableOpacity>
      {inputVisibility && (
        <View style={[styles.toggleBlock, marginVisibility && {marginBottom: wp(26)}]}>
            <TextInput value={anotherDiagnosis} style={[styles.listText, {height: hp(4.98), width: wp(85.13)}]}
                placeholder='Введите свой диагноз' placeholderTextColor={colors.grey2}
                onFocus={() => setMarginVisibility(true)}
                onChangeText={(s) => setAnotherDiagnosis(s)}
                onEndEditing={() => {setAnotherDiagnosisSecureStore(); setMarginVisibility(false)}}/>
            <TouchableOpacity onPress={() => setAnotherDiagnosisSecureStore()}
                style={{height: hp(4.98), width: wp(8), justifyContent: 'center', alignItems: 'center'}}>
                <Image style={styles.diagnosisButtonPicture} source={require('../../../assets/images/diagnosisPicture.png')}/>
            </TouchableOpacity>
        </View>
      )}
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  toggleBlock: {
    height: hp(4.98),
    width: wp(95.9),
    marginTop: hp(1.78),
    marginLeft: wp(4.1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.separator,
    borderBottomWidth: wp(0.26),
  },
  listText: {
    fontSize: RFValue(17, height),
    fontFamily: 'SF-Pro-Regular',
    color: colors.black,
    lineHeight: hp(2.4),
    width: wp(85.13)
  },
  diagnosisPicture: {
    width: wp(4.62),
    height: hp(2.13),
    aspectRatio: 1,
    marginLeft: wp(2.05),
  },
  diagnosisButtonPicture: {
    width: wp(4.62),
    height: hp(2.6),
    aspectRatio: 1,
  },
})