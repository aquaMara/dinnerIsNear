import { ScrollView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('screen');

export default function ArticleBlock({ item }) {

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
    <View style={styles.articleBlock}>
        {console.log(item)}
        <View style={styles.textBlocks}>
            <Text style={styles.titleText}>{item.topic}</Text>
            <Text style={styles.bodyText}>{item.description}</Text>
        </View>
        <TouchableOpacity style={styles.arrowBlock} onPress={() => navigation.navigate("Article", {item: item, title: item.topic})}
            numberOfLines={1} ellipsizeMode='tail'>
            <Image source={require('../../../assets/images/chevronLeft.png')}
                style={styles.arrowImage} />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    articleBlock: {
        width: wp(91.79),
        height: hp(9.83),
        marginBottom: hp(2.01),
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
    textBlocks: {
        width: wp(76.92),
        height: hp(4.86),
        marginLeft: wp(3.33),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
        height: hp(2.36),
    },
    titleText: {
        fontFamily: 'SF-Pro-Medium',
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        color: colors.black,
        textAlign: 'left',
    },
    bodyText: {
        fontFamily: 'SF-Pro-Regular',
        fontSize: RFValue(15, height),
        lineHeight: hp(2.12),
        color: colors.black,
        textAlign: 'left',
    }
})