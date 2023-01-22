import { ScrollView, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';

const { height } = Dimensions.get('screen');

export default function SignsBlock() {

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
    });
    
    if (!fontsLoaded) {
        return null;
    }

  return (
    <View style={styles.signsBlock}>
        <View style={styles.signBlock}>
            <View style={[styles.circleBlock, styles.goodResultColor]}>
                <Image source={require('../../../assets/images/medal-star.png')}
                    style={styles.circleImage}/>
                    <Text style={[styles.titleBoldText, {color: colors.white, marginTop: hp(0.78)}]}>+3%</Text>
            </View>
            <Text style={[styles.titleBoldText, {color: colors.grey}]}>Калории</Text>
        </View>
        <View style={styles.signBlock}>
            <View style={[styles.circleBlock, styles.goodResultColor]}>
                <Image source={require('../../../assets/images/medal-star.png')}
                    style={styles.circleImage}/>
                    <Text style={[styles.titleBoldText, {color: colors.white, marginTop: hp(0.78)}]}>+9%</Text>
            </View>
            <Text style={[styles.titleBoldText, {color: colors.grey}]}>Жиры</Text>
        </View>
        <View style={styles.signBlock}>
            <View style={[styles.circleBlock, styles.badResultColor]}>
                <Image source={require('../../../assets/images/medal-star.png')}
                    style={styles.circleImage}/>
                    <Text style={[styles.titleBoldText, {color: colors.white, marginTop: hp(0.78)}]}>-1%</Text>
            </View>
            <Text style={[styles.titleBoldText, {color: colors.grey}]}>Холестерин</Text>
        </View>

     </View>
  )
}

const styles = StyleSheet.create({
    signsBlock: {
        height: hp(13.63),
        width: wp(90.26),
        marginTop: hp(2.84),
        marginBottom: hp(2.49),
        backgroundColor: colors.white,
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    signBlock: {
        height: hp(13.63),
        width: wp(23.08),
        borderColor: 'green',
        alignItems: 'center',
    },
    circleBlock: {
        width: wp(23.08),
        height: hp(10.67),
        borderRadius: wp(69.74),
        aspectRatio: 1,    
        shadowColor: colors.black,
        shadowOffset: {width: wp(0), height: hp(0.36)},
        shadowRadius: hp(0.95),
        shadowOpacity: 0.15,
        alignItems: 'center'
    },
    circleImage: {
        height: hp(4.74),
        width: wp(10.26),
        marginTop: hp(2.42),
    },
    titleBoldText: {
        fontFamily: 'SF-Pro-Bold',
        fontSize: RFValue(11, height),
        lineHeight: hp(1.56),
        color: colors.grey,
        marginTop: 'auto',
        marginBottom: 0
    },
    goodResultColor: {
        backgroundColor: colors.green,
    },
    badResultColor: {
        backgroundColor: colors.red,
    },
})