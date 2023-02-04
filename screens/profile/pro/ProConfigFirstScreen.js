import { ScrollView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

const { height } = Dimensions.get('screen');

export default function ProConfigFirstScreen() {

  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
  });
            
  if (!fontsLoaded) {
      return null;
  }
  
  return (
    <View style={{flex:1, backgroundColor: colors.white}}>
        <View style={[styles.block, {marginTop: hp(2.49)}]}>
            <View style={styles.textBlock}>
                <Text style={styles.titleText}>Нежелательные продукты</Text>
            </View>
            <TouchableOpacity style={styles.arrowBlock} 
                onPress={() => navigation.navigate('UndesirableProducts')}>
            <Image source={require('../../../assets/images/chevronLeft.png')}
                    style={styles.arrowImage} />
            </TouchableOpacity>
        </View>
        <View style={styles.block}>
            <View style={styles.textBlock}>
                <Text style={styles.titleText}>Теги на неделю</Text>
            </View>
            <TouchableOpacity style={styles.arrowBlock} 
                onPress={() => navigation.navigate('WeekTags')}>
            <Image source={require('../../../assets/images/chevronLeft.png')}
                    style={styles.arrowImage} />
            </TouchableOpacity>
        </View>
        <View style={styles.block}>
            <View style={styles.textBlock}>
                <Text style={styles.titleText}>Режимы и особенности</Text>
            </View>
            <TouchableOpacity style={styles.arrowBlock} 
                onPress={() => navigation.navigate('Modes')}>
            <Image source={require('../../../assets/images/chevronLeft.png')}
                    style={styles.arrowImage} />
            </TouchableOpacity>
        </View>
        <View style={styles.block}>
            <View style={styles.textBlocks}>
                <Text style={styles.titleText}>Консультация с нутрициологом</Text>
                <Text style={styles.regularText}>Поможем настроить профиль идеяльно для вас</Text>
            </View>
            <TouchableOpacity style={styles.arrowBlock} 
                onPress={() => Linking.openURL('whatsapp://send?phone=+375447659068')}>
            <Image source={require('../../../assets/images/chevronLeft.png')}
                    style={styles.arrowImage} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    block: {
        width: wp(91.79),
        marginTop: hp(1.54),
        height: hp(7.82),
        backgroundColor: colors.white,
        borderRadius: wp(5.13),
        alignSelf: 'center',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowColor: colors.black,
        shadowRadius: wp(2.05),
        shadowOpacity: 0.18,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textBlock: {
        width: wp(76.92),
        marginLeft: wp(3.33),
        height: hp(2.4),
    },
    textBlocks: {
        width: wp(76.92),
        marginLeft: wp(3.33),
        height: hp(4.62),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    titleText: {
        fontFamily: 'SF-Pro-Bold',
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        color: colors.black,
        textAlign: 'left',
        height: hp(2.37),
    },
    regularText: {
        fontFamily: 'SF-Pro-Regular',
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        color: colors.grey,
        textAlign: 'left',
    },
    arrowBlock: {
        width: wp(6.41),
        height: hp(4.74),
        marginRight: wp(3.33),
        marginLeft: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrowImage: {
        width: wp(2.94),
        //width: wp(4.41),
        height: hp(2.36),
        //height: hp(3.54),
    }
})