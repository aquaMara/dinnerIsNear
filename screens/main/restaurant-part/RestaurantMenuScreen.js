import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions, Image } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import AppearingDishDescription from '../components/AppearingDishDescription';
import { useFonts } from 'expo-font';
import { FlatList } from 'react-native';
import { colors } from '../../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import dishesSections from '../../../data/dishesSections';
import AppearingDishDescriptionModal from '../modals/AppearingDishDescriptionModal';
import { useShoppingCart } from '../../../auth/ShoppingCartProvider';
import dishesList from '../../../data/dishesList';
import { useAuth } from '../../../auth/AuthProvoder';

import { getAuth } from 'firebase/auth';
import app from '../../../firebase-config';
import firebase from 'firebase/compat';

import { TagsSearch } from '../../../functions/TagsSearch';

const { height } = Dimensions.get('screen');  

export default function RestaurantMenuScreen({navigation, route}) {

    const [tags, setTags] = useState();
    //const {currentUser, setCurrentUser} = useAuth();
    const [dishes, setDishes] = useState([{}]);
    const [dishesIntro, setDishesIntro] = useState([]);
    const [currentSectionName, setCurrentSectionName] = useState(null);
    const [activeItem, setActiveItem] = useState({});
    const [visibility, setVisibility] = useState(false);
    const currentRestaurantName = route.params.title;
    console.log('ghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', route.params)

    const chooseMessage = (item,message) => {
        setActiveItem(item);
        setVisibility(message);
    };

    const handleSectionChoice = (id, name) => {
        if (name === 'Все') {
            setDishes(findDishesByRestaurant())
            setCurrentSectionName('Все')
        } else {
            setDishes(findDishesByRestaurantAndBySectionName(name));
            setCurrentSectionName(name);
        }     
    }

    const findDishesByRestaurantAndBySectionName = (name) => {
        var result = dishesList.filter(obj => {
            return obj.section === name && obj.restaurantName === currentRestaurantName;
        })
        return result;
    }

    const findDishesByRestaurant = () => {
        console.log('findDishesByRestaurant')
        var result = dishesList.filter(obj => {
            console.log('OBJ', obj)
            return obj.restaurantName === currentRestaurantName;
        })
        return result;
    }

    const TagsSearch = async () => {
        const userId = 'LAS3S528apZ5J627SwEfsIn6oke2';
        console.log('USERID ', userId);

        await firebase.firestore().collection('tags')
          .doc(userId).get()
          .then((snapshot) => {
            if (snapshot) {
                console.log('snapshot.data()', snapshot.data())
                setTags(snapshot.data());
                //setTags(prev => ([...prev, ...snapshot.data()]));
            }
            console.log('tags', tags);
            return tags;
        }).catch((err) => {console.log('TAGS ERR', err)})
        console.log('test')
        return tags;
    }

    const filterTags = async () => {
        console.log('foundTags', foundTags)
        if (foundTags) {
            var keys = Object.keys(foundTags);
            var filteredTrueTags = keys.filter(function(key) {
                return foundTags[key]
            });
            console.log('FILTERED ', filteredTrueTags);

            console.log('**********************************************************')
            // FILTERED  ["roasted", "stewed", "nuts", "lactose", "sugar", "vegetarianism", "gluten", "fish"]
            const dishesTest = [
                {"id": "1",
                "name": "one",
                "tags": "meat, nuts, milk"},
                {"id": "2",
                "name": "two",
                "tags": "roasted"},
                {"id": "3",
                "name": "one",
                "tags": "any"},
                {"id": "4",
                "name": "four",
                "tags": ""},
            ]
            dishesTest.forEach(element => {
                console.log(element)
            });

            let check = 0;
            var filterDishesWithTags = dishesTest.filter(obj => {
                
                filteredTrueTags.every(element => {
                    console.log('element ', element, ' obj.tags ', obj.tags)
                    console.log('obj.tags.indexOf(element)', obj.tags.indexOf(element))
                    if (obj.tags.indexOf(element) === -1) {
                        check = -1;
                        return true;
                    } else {
                        check = obj.tags.indexOf(element);
                        console.log('HAHHAHHAHHAHHAHHAHHAHHAHHAHHAHHAHHAHHAHHAHHAHHAH', element, obj.tags)
                        return false;
                    }
                });
                console.log('check check check check check check check check', check, obj)
                if (check === -1) {
                    return obj;
                }

            })

            console.log('filterDishesWithTags', filterDishesWithTags);

            filteredTrueTags.forEach(element => {
                console.log(element)
            });
            
        }

        
        /*
        var foodForCurrentMeal = cart.filter(obj => {
            return obj.mealId === mId
        })
        */
    }

    useEffect(() => {
        setDishes(findDishesByRestaurant());
        //filterTags();
        setDishesIntro(dishesSections);
        setCurrentSectionName('Все');
    }, []);

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
      });
      
      if (!fontsLoaded) {
        return null;
      }

    const ItemRender = ({ name, id }) => (
        <TouchableOpacity style={[styles.topMenuBlock, currentSectionName === name && {backgroundColor: colors.green}]}
            onPress={() => handleSectionChoice(id, name)}>
            <Text style={styles.regularText}>{name}</Text>
        </TouchableOpacity>
    );

    const RenderItem = ({ item }) => (
        <TouchableOpacity style={styles.block} onPress={() => chooseMessage(item, true)}>
            <View style={styles.topBlock}>
                <Image source={{uri: item.dishPath}} style={styles.dishImage} resizeMode='cover' />
                <View style={styles.imagesContainer}>
                    <TouchableOpacity style={styles.heartImageButton}>
                        <Image source={require('../../../assets/images/heart.png')} style={styles.heartImage} />
                    </TouchableOpacity>
                    <View style={styles.tagsContainer}>
                        {item.tags.indexOf("vegetarianism") > -1 && <Image source={require('../../../assets/images/vegetarianismTag.png')} style={[styles.tagImage, {marginRight: 0}]} />}
                        {item.tags.indexOf("veganism") > -1 && <Image source={require('../../../assets/images/veganismTag.png')} style={styles.tagImage} />}
                        {item.tags.indexOf("meat") > -1 && <Image source={require('../../../assets/images/meatTag.png')} style={styles.tagImage} />}
                        {item.tags.indexOf("fish") > -1 && <Image source={require('../../../assets/images/fishTag.png')} style={[styles.tagImage]} />}
                    </View>
                </View>

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
            <TouchableOpacity onPress={() => chooseMessage(item, true)} style={styles.littleButton}>
                <Text style={styles.buttonText}>{item.dishPrice}р</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <View style={styles.topMenu}>
            <View style={{width: wp(11.8)}}>
                <TouchableOpacity>
                    <Image source={require('../../../assets/images/searchButton.png')} style={styles.search}/>
                </TouchableOpacity>
            </View>
            <View style={{width: wp(88.2)}}>
                <FlatList data={dishesIntro} 
                    renderItem={({ item }) => <ItemRender name={item.name} id={item.id} />} keyExtractor={item => item.id}
                    horizontal={true} />
            </View>   
        </View>
        <FlatList numColumns={2} data={dishes} 
            renderItem={RenderItem}
            keyExtractor={item => item.id} />
            <AppearingDishDescriptionModal activeItem={activeItem}  
                    mealId={route.params.mealId} chooseMessage={chooseMessage} visibility={visibility} />
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
    imagesContainer: {
        height: hp(5),
        width: wp(38.46),
        alignSelf: 'center',
        //marginHorizontal: wp(2.82),
        marginTop: hp(-19.1),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    heartImageButton: {
        height: hp(5),
        width: wp(10),
        justifyContent: 'center',
    },
    heartImage: {
        height: hp(1.66),
        width: wp(4.1),
        width: wp(6.92),
        height: hp(2.84),
    },
    tagsContainer: {
        height: hp(5),
        width: wp(28.46),
        borderWidth: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    tagImage: {
        borderWidth: 0.5,
        width: wp(6.92),
        width: wp(9.23),
        height: hp(2.84),
        height: hp(4.27),
        //aspectRatio: 1,
        borderColor: 'red',
        marginLeft: wp(-6), marginRight: 'auto'
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