import { ScrollView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import { useState } from 'react';
import { Switch } from 'react-native';

const { height } = Dimensions.get('screen');

export default function ModesScreen() {

  const [poisoning, setPoisoning] = useState(false);
  const [malaiseMode, setMalaiseMode] = useState(false);  

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={styles.block}>
        <View style={styles.labelBlock}>
          <Text style={styles.labelText}>Режимы работы приложения</Text>
        </View>
        <View style={[styles.toggleBlock, styles.firstToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Отравление</Text>
          <Switch value={poisoning} onValueChange={() => setPoisoning(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
        <View style={[styles.toggleBlock, styles.allToggleBlockMarginTop]}>
          <Text style={[styles.listText, {width: wp(77)}]}>Недомогание / Простуда</Text>
          <Switch value={malaiseMode} onValueChange={() => setMalaiseMode(previousState => !previousState)}
            trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: colors.green }}
            style={{marginRight: wp(4.1), marginLeft: 'auto', marginBottom: hp(0.65)}}
            thumbColor={colors.white} />
        </View>
      </View>
      <View style={styles.smallBlock}>
        <Text style={[styles.smallText]}>Включая данные настройки мы помогаем вам изменить рацион, чтобы вы быстрее поправились.</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  block: {
    marginLeft: wp(4.1),
    marginTop: hp(2.49),
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
  smallBlock: {
    width: wp(77.95),
    height: hp(3.79),
    marginTop: hp(1.54),
    alignSelf: 'center',
  },
  smallText: {
    fontFamily: 'SF-Pro-Regular',
    fontSize: RFValue(13, height),
    lineHeight: hp(1.84),
    color: colors.grey,
    textAlign: 'center'
  }
})