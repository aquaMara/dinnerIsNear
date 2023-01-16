import { ScrollView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';

const { height } = Dimensions.get('screen');

export default function MiddleLineBlock() {

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
  });
        
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
        <View style={styles.middleLineBlock}>
            <Text style={styles.regularText}>Дополнительно</Text>
        </View>
        <View style={[styles.block, styles.topBlockHeight]}>
            <View style={[styles.textBlocks, styles.topTextBlockHeight]}>
                <Text style={styles.titleText}>Полезные статьи</Text>
                <Text style={styles.regularText}>Узнай подробнее о нутриентах</Text>
            </View>
            <TouchableOpacity style={styles.arrowBlock}>
            <Image source={require('../../../assets/images/chevronLeft.png')}
                    style={styles.arrowImage} />
            </TouchableOpacity>
        </View>
        <View style={[styles.block, styles.bottomBlockHeight]}>
            <View style={[styles.textBlocks, styles.bottomTextBlockHeight]}>
                <Text style={styles.titleText}>Консультация с нутрициологом</Text>
                <Text style={styles.regularText} numberOfLines={2} ellipsizeMode='tail'>Хочешь добиться лучшего результата 
                или улучшить своё самочувствие? Запишись на консультацию</Text>
            </View>
            <TouchableOpacity style={styles.arrowBlock}>
            <Image source={require('../../../assets/images/chevronLeft.png')}
                    style={styles.arrowImage} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    middleLineBlock: {
        width: wp(92.31),
        marginTop: hp(2.96),
        alignSelf: 'center',
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
    block: {
        width: wp(91.79),
        marginTop: hp(1.54),
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
    topBlockHeight: {
        height: hp(7.82),
    },
    bottomBlockHeight: {
        height: hp(9.6),
    },
    textBlocks: {
        width: wp(76.92),
        marginLeft: wp(3.33),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    topTextBlockHeight: {
        height: hp(4.62),
    },
    bottomTextBlockHeight: {
        height: hp(6.52),
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