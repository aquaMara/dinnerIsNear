import { Dimensions, View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, SafeAreaView, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react';
import data from '../chat/data';
import dishesList from '../../data/dishesIntroduction';
import dishesSections from '../../data/dishesSections';
import { useFonts } from 'expo-font';
import { colors } from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { collection, getDoc, getFirestore, getDocs, collectionGroup, query, where, doc, documentId } from "@firebase/firestore";
import { FlatList } from 'react-native';
//import AppearingDishDescription from './components/AppearingDishDescription';
import AppearingDishDescriptionModal from './modals/AppearingDishDescriptionModal';

const { height } = Dimensions.get('screen');

export default function MenuScreen({ navigation, route }) {

    const [dishes, setDishes] = useState([{}]);
    const [dishesIntro, setDishesIntro] = useState([]);
    const [currentSectionId, setCurrentSectionId] = useState(null);
    const db = getFirestore();
    const colRef = collection(db, 'dishes');

    const [visibility, setVisibility] = useState(false);
    const chooseMessage = (message) => {
        setVisibility(message);
    };

    const handleSectionChoice = (id, name) => {
        setCurrentSectionId(id);
        navigation.setOptions({
            title: name,
          });
    }
    
    // <View style={[styles.topMenuBlock]}>
    const ItemRender = ({ name, id }) => (
        <TouchableOpacity style={[styles.topMenuBlock, currentSectionId === id && {backgroundColor: colors.green}]}
            onPress={() => handleSectionChoice(id, name)}>
            <Text style={styles.regularText}>{name}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <View style={styles.block}>
            <View style={styles.topBlock}>
                <Image source={require('../../assets/images/dish.png')} style={styles.dishImage} resizeMode='cover' />
                <TouchableOpacity style={styles.heartImageButton}>
                    <Image source={require('../../assets/images/heart.png')} style={styles.heartImage} />
                </TouchableOpacity>
                <View style={styles.middleBlock}>
                    <View style={{width: wp(23.08), height: hp(5.92)}}>
                        <Text style={styles.dishText} numberOfLines={2} ellipsizeMode='tail'>{item.dishName}</Text>
                    </View>
                    <View style={{width: wp(12)}}>
                        <Text style={[styles.dishText, {textAlign: 'center'}]}>{item.dishCalories}</Text>
                        <Text style={[styles.dishText, {textAlign: 'center'}]}>ккал</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomBlock}>
                <View><Text style={styles.regularText}>{item.dishProtein} Б</Text></View>
                <View style={{marginHorizontal: wp(2.56)}}><Text style={styles.regularText}>{item.dishFats} Ж</Text></View>
                <View><Text style={styles.regularText}>{item.dishCarbohydrates} У</Text></View>
            </View>
            <TouchableOpacity onPress={() => chooseMessage(true)} style={styles.littleButton}>
            <Text style={styles.buttonText}>{item.dishPrice}р</Text>
                <AppearingDishDescriptionModal item={item} chooseMessage={chooseMessage} visibility={visibility} />
            </TouchableOpacity>
        </View>
    );

    useEffect(() => {
        setDishes(dishesList);
        setDishesIntro(dishesSections);
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
        backgroundColor: colors.white,
        height: hp(29.03),
        width: wp(43.59),
        borderRadius: hp(2.37),
        marginBottom: hp(2.13),
        shadowColor: 'rgba(0, 0, 0, 0.18)',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowRadius: wp(2.1),
        shadowOpacity: 1,
        marginLeft: wp(4.1),
    },
    topBlock: {
        height: hp(20.14),
        width: wp(43.59),
    },
    dishImage: {
        width: wp(43.59),
        height: hp(20.14),
        borderRadius: hp(2.37),
    },
    heartImageButton: {
        height: hp(5),
        width: wp(10),
        marginLeft: wp(2.82),
        marginTop: hp(-19.1),
    },
    heartImage: {
        height: hp(1.66),
        width: wp(4.1),
        width: wp(6.92),
        height: hp(2.84),
    },
    middleBlock: {
        width: wp(37.44),
        height: hp(5.92),
        marginBottom: hp(0),
        marginTop: hp(8),
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomBlock: {
        width: wp(43.59),
        height: hp(3),
        marginTop: hp(1.18),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dishText: {
        color: colors.white,
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        fontFamily: 'SF-Pro-Medium',
    },
    regularText: {
        color: colors.black,
        fontSize: RFValue(13, height),
        lineHeight: hp(1.84),
        fontFamily: 'SF-Pro-Regular',
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
    },   
    buttonText: {
        color: colors.white,
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        fontFamily: 'SF-Pro-Medium',
        textAlign: 'center',
    },
    littleButton: {
        width: wp(40.51),
        height: hp(3.8),
        backgroundColor: colors.green,
        borderRadius: hp(2.61),
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
    },
})