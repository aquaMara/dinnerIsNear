import { Dimensions, View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, SafeAreaView, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react';
import data from '../chat/data';
import dishesIntroduction from '../../data/dishesIntroduction';
import { useFonts } from 'expo-font';
import { Linking } from 'react-native';
import { firebaseConfig } from '../../firebase-config';
import firebase from "firebase/compat";
import { globalStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { collection, getDoc, getFirestore, getDocs, collectionGroup, query, where, doc, documentId } from "@firebase/firestore";
import { FlatList } from 'react-native';
import TopView from './components/TopView';
import AppearingDishDescription from './components/AppearingDishDescription';

const { height } = Dimensions.get('screen');  

export default function MenuScreen({ navigation, route }) {

    const [dishes, setDishes] = useState([{}]);
    const [dishesIntro, setDishesIntro] = useState([]);
    const [currentSectionId, setCurrentSectionId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const db = getFirestore();
    const colRef = collection(db, 'dishes');
    console.log('dd', data);
    
    console.log('jjjjjjj', route.params.title)

    const handleSectionChoice = (id, name) => {
        console.log('handleSectionChoice id ', id);
        setCurrentSectionId(id);
        navigation.setOptions({
            title: name,
          });
    }

    const handleDishChoice = (id) => {
        console.log('handleDishChoice id ', id);
    }

    // <View style={[styles.topMenuBlock]}>
    const ItemRender = ({ name, id }) => (
        <TouchableOpacity style={currentSectionId === id ? styles.topMenuBlockActive : styles.topMenuBlock}
            onPress={() => handleSectionChoice(id, name)}>
            <Text style={styles.regularText}>{name}</Text>
        </TouchableOpacity>
    );
// {item.dishName.length > 16 ? (item.dishName.substring(0, 16)+'...') : (item.dishName.substring(0, 16))}
    const renderItem = ({ item }) => (
        <View style={styles.block}>
            <View style={{  }}>
                <Image source={require('../../assets/images/dish.png')} style={styles.image} resizeMode='cover' />
            </View>
            <View style={[styles.dishName]}>
                <View style={{width: wp(23.08), height: hp(6)}}>
                    <Text style={styles.dishText} numberOfLines={2} ellipsizeMode='tail'>{item.dishName}</Text>
                </View>
                <View style={{width: wp(12)}}>
                    <Text style={[styles.dishText, {textAlign: 'center'}]}>{item.dishCalories}</Text>
                    <Text style={[styles.dishText, {textAlign: 'center'}]}>ккал</Text>
                </View>
            </View>
            <View style={styles.pfcBlock}>
                <View><Text style={styles.regularText}>{item.dishProtein} Б</Text></View>
                <View style={{marginHorizontal: wp(2.56)}}><Text style={styles.regularText}>{item.dishFats} Ж</Text></View>
                <View><Text style={styles.regularText}>{item.dishCarbohydrates} У</Text></View>
            </View>
            <AppearingDishDescription item={item} />
        </View>
    );

    useEffect(() => {
        setDishes(data);
        setDishesIntro(dishesIntroduction);
        setCurrentSectionId(route.params.sectionId)
    }, [])

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
      });
      
      if (!fontsLoaded) {
        return null;
      }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <View style={styles.topMenu}>
            <View style={{width: wp(11.8)}}>
                <TouchableOpacity style={{}}>
                    <Image source={require('../../assets/images/searchButton.png')} style={styles.search}/>
                </TouchableOpacity>
            </View>
            <View style={{width: wp(88.2)}}>
                <FlatList data={dishesIntro} 
                    renderItem={({ item }) => <ItemRender name={item.name} id={item.id} />} keyExtractor={item => item.id}
                    horizontal={true} />
            </View>   
        </View>
        <FlatList numColumns={2} data={dishes} 
            renderItem={renderItem} keyExtractor={item => item.id} />
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    block: {
        // flex: 0.4,
        backgroundColor: colors.white,
        height: hp(29.03),
        width: wp(43.59),
        borderRadius: hp(2.37),
        alignItems: 'center',
        marginBottom: hp(2.13),
        shadowColor: 'rgba(0, 0, 0, 0.18)',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowRadius: wp(2.1),
        shadowOpacity: 1,
        marginLeft: wp(4.1),
    },
    littleButton: {
        width: wp(40.51),
        height: hp(3.8),
        backgroundColor: colors.green,
        borderRadius: hp(2.61),
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        fontFamily: 'SF-Pro-Bold',
        textAlign: 'center',
    },
    dishText: {
        color: colors.white,
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        fontFamily: 'SF-Pro-Medium',
    },
    image: {
        width: wp(43.59),
        height: hp(20.14),
        borderRadius: hp(2.37),
        //aspectRatio: 1,
    },
    dishName: {
        width: wp(37.44),
        height: hp(4.74),
        marginTop: -hp(5.92),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    pfcBlock: {
        marginTop: hp(1.19),
        width: wp(37.44),
        height: hp(4.38),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topMenu: {
        height: hp(8.06),
        width: wp(100),
        justifyContent: 'center',
        backgroundColor: colors.white,
        display: 'flex',
        flexDirection: 'row',
    },
    search: {
        height: hp(3.45),
        width: hp(3.45),
        marginLeft: wp(4.1),
        shadowColor: 'rgba(0, 0, 0, 0.18)',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowRadius: wp(2.1),
        shadowOpacity: 1,
        marginTop: hp(2.37),
    },
    regularText: {
        color: colors.black,
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        fontFamily: 'SF-Pro-Regular',
    },
    topMenuBlock: {
        height: hp(3.56),
        backgroundColor: colors.white,
        marginLeft: wp(3.34),
        borderRadius: hp(11.85),
        justifyContent: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: wp(6.4),
        paddingVertical: hp(0.83),
        shadowColor: 'rgba(0, 0, 0, 0.18)',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowRadius: wp(2.1),
        shadowOpacity: 1,
        marginTop: hp(2.37),
    },
    topMenuBlockActive: {
        height: hp(3.56),
        backgroundColor: colors.green,
        marginLeft: wp(3.34),
        borderRadius: hp(11.85),
        justifyContent: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: wp(6.4),
        paddingVertical: hp(0.83),
        shadowColor: 'rgba(0, 0, 0, 0.18)',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowRadius: wp(2.1),
        shadowOpacity: 1,
        marginTop: hp(2.37),
    }
})