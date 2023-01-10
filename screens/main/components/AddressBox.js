import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';

const { height } = Dimensions.get('screen');

export default function AddressBox() {

    const [address, setAddress] = useState('проспект Толстова, 237');

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
    });
    
    if (!fontsLoaded) {
        return null;
    }

  return (
    <View style={styles.addressBox}>
        <View style={styles.addressInsideBox}>
            <Image source={require('../../../assets/images/mapTrigger.png')} 
                style={{height: hp(5.2), width: wp(13.98), marginLeft: wp(4.1) }}/>
            <View style={styles.writtenAddress}>
                <View style={{height: hp(4.27), display: 'flex', flexDirection: 'column'}}>
                <View style={{display: 'flex', flexDirection: 'row',}} >
                    <Text style={styles.title}>Адрес доставки</Text>
                    <Image source={require('../../../assets/images/chevronLight.png')}
                        style={{height: hp(1.3), width: wp(1.28), marginLeft: wp(1.03), alignSelf: 'center'}} />
                </View>
                <Text style={styles.value}>{address.substring(0, 19)}...</Text>
                </View>
            </View>
            <View style={styles.buttonsBox}>
                <TouchableOpacity>
                    <Image source={require('../../../assets/images/favourites.png')}
                        style={{height: hp(3.55), width: wp(7.69)}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../../assets/images/shop.png')}
                        style={{height: hp(3.55), width: wp(7.69), marginLeft: wp(3.33)}}/>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    addressBox: {
        height: hp(9.36),
        width: wp(100),
        marginTop: hp(5.57),
    },
    addressInsideBox: {
        marginTop:  hp(1.54),
        display: 'flex',
        flexDirection: 'row',
    },
    writtenAddress: {
        marginLeft: wp(3.33),
    },
    buttonsBox: {
        width: wp(19),
        height: hp(3.55),
        marginRight: wp(4.1),
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 'auto',
        alignSelf: 'center'
    },
    title: {
        fontSize: RFValue(13, height),
        fontFamily: 'SF-Pro-Regular',
        color: colors.black,
        opacity: 0.4,
        lineHeight: hp(1.84),
        textAlign: 'center'
    }, 
    value: {
        fontSize: RFValue(17, height),
        fontFamily: 'SF-Pro-Bold',
        lineHeight: hp(2.4),
        textAlign: 'center',
    },
})