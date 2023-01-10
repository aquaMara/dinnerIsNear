import AddressBox from './components/AddressBox'
import RecommendationScreen from './RecommendationScreen'
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../styles/colors';
import SwitchSelector from "react-native-switch-selector";
import RestaurantScreen from './RestaurantScreen';

const { height } = Dimensions.get('screen');

export default function ScreenChoice() {

    const [address, setAddress] = useState('проспект Толстова, 237');
    const [isHomeScreen, setIsHomeScreen] = useState(true);

    const setScreen = (val) => {
        console.log(val);
        setIsHomeScreen(val)
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
    <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={styles.addressBox}>
      
        <View style={styles.addressInsideBox}>
        <SwitchSelector
            style={{marginLeft: 14, height: hp(3.67), width: wp(15.08), padding: 0}}
            imageStyle={{height: hp(3.2), width: wp(6.92)}}
            onPress={val => setScreen(val)}
            initial={1}
                selectedColor={colors.green}
                textColor={isHomeScreen ? colors.green : 'rgba(120, 120, 128, 0)'}
                buttonColor={colors.white}
                borderColor={colors.green}
                backgroundColor={isHomeScreen ? colors.green : 'rgba(120, 120, 128, 0.16)'}
                options={[
                    { value: false, imageIcon: require('../../assets/images/restaurant.png'), activeColor: 'white' }, //images.feminino = require('./path_to/assets/img/feminino.png')
                    { value: true, imageIcon: require('../../assets/images/map.png'), activeColor: 'white' } //images.masculino = require('./path_to/assets/img/masculino.png')
                ]} />
            
            {isHomeScreen ? 
            (<View style={styles.writtenAddress}>
                <View style={{height: hp(4.27), display: 'flex', flexDirection: 'column'}}>
                <View style={{display: 'flex', flexDirection: 'row',}} >
                    <Text style={styles.title}>Адрес доставки</Text>
                    
                    <Image source={require('../../assets/images/chevronLight.png')}
                        style={{height: hp(1.3), width: wp(1.28), marginLeft: wp(1.03), alignSelf: 'center'}} />
                </View>
                <Text style={styles.value}>{address.substring(0, 19)}...</Text>
                </View>
            </View>) : (
            <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: wp(20.3)}} >
                <Text style={[styles.value, {textAlign: 'center', }]}>В ресторане</Text>
            </View>)}
            <View style={[styles.buttonsBox]}>
                <TouchableOpacity>
                    <Image source={require('../../assets/images/favourites.png')}
                        style={{height: hp(3.55), width: wp(7.69)}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/images/shop.png')}
                        style={{height: hp(3.55), width: wp(7.69), marginLeft: wp(3.33)}}/>
                </TouchableOpacity>
            </View>
        </View>
      </View>
      {isHomeScreen ? <RecommendationScreen /> : <RestaurantScreen />}
    </ScrollView>
  )
}
/*
<Image source={require('../../assets/images/mapTrigger.png')} 
                style={{height: hp(5.2), width: wp(13.98), marginLeft: wp(4.1) }}/>
                */
const styles = StyleSheet.create({
    addressBox: {
        height: hp(9.36),
        width: wp(100),
        marginTop: hp(5.57),
    },
    addressInsideBox: {
        marginTop:  hp(1.54),
        height: hp(4.27),
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