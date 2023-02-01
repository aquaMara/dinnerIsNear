import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import articlesIntroduction from '../../data/articlesIntroduction';
import ArticleBlock from './components/ArticleBlock';

const { height } = Dimensions.get('screen');

export default function ArticlesScreen() {

  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(articlesIntroduction);
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
    <View style={{flex: 1, backgroundColor: colors.white}}>
        <View style={styles.searchBarBox}>
            <TextInput value={search} style={styles.searchInput}
                placeholder='Поиск' placeholderTextColor={colors.grey2}
                onChangeText={(s) => setSearch(s)} />
            <TouchableOpacity style={styles.searchButton}>
            <Image source={require('../../assets/images/search.png')} style={styles.searchImage} />
            </TouchableOpacity>
        </View>
        <FlatList numColumns={1} data={articles} scrollEnabled={false} 
            renderItem={({ item }) => <ArticleBlock item={item}/>}
            keyExtractor={item => item.id} />
    </View>
  )
}

const styles = StyleSheet.create({
    searchBarBox: {
        height: hp(4.74),
        width: wp(91.8),
        marginBottom: hp(1.07),
        borderRadius: wp(5.13),
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {width: wp(0), height: hp(0.36)},
        shadowRadius: wp(2.1),
        shadowOpacity: 0.15,
        marginTop: hp(1.54),
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
      },
      searchInput: {
        height: hp(4.74),
        width: wp(91.8),
        borderRadius: wp(5.13),
        paddingHorizontal: wp(5.38),
        paddingVertical: hp(0.59),
      },
      searchButton: {
        width: wp(10),
        marginRight: wp(0),
        marginLeft: 'auto',
        justifyContent: 'center'
      },
      searchImage: {
        width: wp(4.62),
        height: hp(2.13),
        aspectRatio: 1,
      },
})