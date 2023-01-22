import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';

const { height } = Dimensions.get('screen');

export default function ArticleScreen({route}) {

  const [article, setArticle] = useState({});

  useEffect(() => {
    setArticle(route.params.item);
  }, []);

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
  });
        
  if (!fontsLoaded) {
    return null;
  }
    
  return (
    <ScrollView>
        <View style={styles.imageBlock}>
            <Image source={require('../../assets/images/articleImage.png')}
                style={styles.articleImage} />
        </View>
        <View style={styles.regularTitleBlock}>
            <Text style={styles.regularTitle}>{article.smallTitle}</Text>
        </View>
        <View style={styles.boldTitleBlock}>
            <Text style={styles.boldTitle}>{article.bigTitle}</Text>
        </View>
        <View style={styles.bodyTextBlock}>
            <Text style={styles.bodyText}>{article.body}</Text>
        </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    imageBlock: {
        width: wp(91.8),
        height: hp(17.77),
        marginTop: hp(2.49),
        alignSelf: 'center',
    },
    articleImage: {
        width: wp(91.8),
        height: hp(17.77),
    },
    regularTitleBlock: {
        width: wp(91.8),
        marginTop: hp(1.78),
        alignSelf: 'center',
    },
    regularTitle: {
        fontFamily: 'SF-Pro-Regular',
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        color: colors.black,
        textAlign: 'left',
    },
    boldTitleBlock: {
        width: wp(91.8),
        marginTop: hp(0.83),
        alignSelf: 'center',
    },
    boldTitle: {
        fontFamily: 'SF-Pro-Bold',
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        color: colors.black,
        textAlign: 'left',
    },
    bodyTextBlock: {
        width: wp(91.8),
        marginTop: hp(2.49),
        alignSelf: 'center',
    },
    bodyText: {
        fontFamily: 'SF-Pro-Regular',
        fontSize: RFValue(15, height),
        lineHeight: hp(2.12),
        color: colors.black,
        textAlign: 'justify',
    },
})