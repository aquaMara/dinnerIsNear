import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, Dimensions, Image, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import { useFonts } from 'expo-font';
import { FlatList } from 'react-native';
import { colors } from '../../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import dishesSections from '../../../data/dishesSections';
//import AppearingDishDescriptionModal from '../modals/AppearingDishDescriptionModal';
import AppearingDeliveryDishModal from '../modals/AppearingDeliveryDishModal';
import dishesList from '../../../data/dishesList';
import { LinearGradient } from 'expo-linear-gradient';
import { addToFavs } from '../../../functions_secure_store/Favourites';

import { RefreshControl } from 'react-native';
import { useDeliveryCart } from '../../../auth/DeliveryCartProvider';

const { height } = Dimensions.get('screen');

export default function RecommendationMenuScreen({navigation, route}) {
  
  const [dishes, setDishes] = useState([{}]);
  const [dishesIntro, setDishesIntro] = useState([]);
  const [currentSectionName, setCurrentSectionName] = useState(null);
  const [activeItem, setActiveItem] = useState({});
  const [visibility, setVisibility] = useState(false);
  const { dcart, setDcart } = useDeliveryCart();
  const [search, setSearch] = useState('');
  const [searchIconVisibility, setSearchIconVisibility] = useState(true);

    const [test, setTest] = useState(3);

    const chooseMessage = (item, message) => {
        setActiveItem(item);
        setVisibility(message);
    };

    const handleSectionChoice = (sectionName) => {
      console.log('sectionName', sectionName)
        if (sectionName === 'Все') {
            setDishes(findDishesAll(dishesList));
            setCurrentSectionName('Все')
        } else {
            setDishes(findDishesBySectionName(sectionName));
            setCurrentSectionName(sectionName);
        }
    }

    const findDishesAll = (dishesList) => {
      let withoutTags = removeProhibitedTags(dishesList);
      return withoutTags;
    }

    const findDishesBySectionName = (sectionName) => {
      let result = dishesList.filter(obj => {
        return obj.section == sectionName;
      })
      let withoutTags = removeProhibitedTags(result);
      return withoutTags;
    }

    const removeProhibitedTags = (result) => {
        let trueTags = route.params.trueTags;
        let trueProTags = route.params.trueProTags;
        let weekTags = route.params.weekTags;
        let tagExists = false;

        let arrayOfTagsOnly = [];
        for (let i = 0; i < weekTags.length; i++) {
            if (weekTags[i].amount > 0) {
                arrayOfTagsOnly.push(weekTags[i].name)
            }
        }

        for (let i = 0; i < trueTags.length; i++) {
            if (arrayOfTagsOnly.includes(trueTags[i])) {
                trueTags.splice(i, 1);
            }
        }
        for (let i = 0; i < trueProTags.length; i++) {
            if (arrayOfTagsOnly.includes(trueProTags[i])) {
                trueProTags.splice(i, 1);
            }
        }
        let withoutTags = result.filter(obj => {
            for (let i = 0; i < trueTags.length; i++) {
                if (obj.tags.indexOf(trueTags[i]) > -1) {
                    tagExists = true;
                }
            }
            if (!tagExists) {
                return obj;
            }
            tagExists = false;
        })

        let withoutProTags = withoutTags.filter(obj => {
            for (let i = 0; i < trueProTags.length; i++) {
                if (obj.tags.indexOf(trueProTags[i]) > -1) {
                    tagExists = true;
                }
            }
            if (!tagExists) {
                return obj;
            }
            tagExists = false;
        })
        return withoutProTags;        
    }

    const isInCart = (activeItem) => {
        const presentElement = dcart.find(element => {
            return (element.id == activeItem.id && element.mealId == route.params.mealId)
        });
        if (presentElement != null) {
            return true;
        }
        return false;
    }

    const countAmountInCart = (activeItem) => {
        const presentElement = dcart.find(element => {
            return (element.id == activeItem.id && element.mealId == route.params.mealId)
        });
        return presentElement.amount;
    }
  
    const handleCartChoice = (activeItem, increase) => {
        let amount = 0;
        let tempCart = JSON.parse(JSON.stringify(dcart));
        for (let i = 0; i < tempCart.length; i++) {
            if (tempCart[i].mealId == route.params.mealId && tempCart[i].id == activeItem.id) {
                if (increase) {
                    tempCart[i].amount = ++tempCart[i].amount;
                } else {
                    tempCart[i].amount = --tempCart[i].amount;
                    if (tempCart[i].amount <= 0) {
                        tempCart.splice(i, 1);
        
                    }
                }
            } else {
                console.log('no');
            }
        }
        setDcart(tempCart);
        return amount;
    }

    const searchForDishesByNameSection = () => {
        console.log(currentSectionName, search);
        let searchedDishes = [];

        if (search.trim().length > 0) {
            if (currentSectionName == 'Все') {
                searchedDishes = dishesList.filter(obj => {
                    return obj.dishName.toLowerCase().includes(search.trim().toLowerCase());
                })
            } else {
                searchedDishes = dishesList.filter(obj => {
                    return obj.dishName.toLowerCase().includes(search.trim().toLowerCase()) && obj.section == currentSectionName;
                })
            }
            // setDishes(searchedDishes);
            setDishes(removeProhibitedTags(searchedDishes));
        } else {
            /*
            if (currentSectionName == 'Все') {
                setDishes(dishesList);
            } else {
                let searchedDishes2 = dishesList.filter(obj => {
                    return obj.section == currentSectionName;
                })
                setDishes(searchedDishes2);
            }
            */
           handleSectionChoice(currentSectionName);            
        }

    }

    useEffect(() => {
      handleSectionChoice(route.params.section)
      setDishesIntro(dishesSections);
      setCurrentSectionName(route.params.section);
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
            onPress={() => handleSectionChoice(name)}>
            <Text style={[styles.regularText, currentSectionName === name && {color: colors.white, fontFamily: 'SF-Pro-Medium',}]}>{name}</Text>
        </TouchableOpacity>
    );

    const RenderItem = ({ item }) => (
        <TouchableOpacity style={styles.block} onPress={() => chooseMessage(item, true)}>    
            <View style={styles.topBlock}>
                <ImageBackground source={{uri: item.dishPath}} 
                    style={styles.dishImage} imageStyle={{borderRadius: hp(2.37)}} resizeMode='cover' >
                    <LinearGradient 
                        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']}
                        locations={[0.3677, 1]}
                        style={styles.dishImage}></LinearGradient>
                </ImageBackground>
                <View style={styles.imagesContainer}>
                    <TouchableOpacity style={styles.heartImageButton} onPress={() => addToFavs(route.params.mealId, item)}>
                        <Image source={require('../../../assets/images/heart.png')} style={styles.heartImage} />
                    </TouchableOpacity>
                    <View style={styles.tagsContainer}>
                        {item.tags.indexOf("vegetarianism") > -1 && <Image source={require('../../../assets/images/vegetarianismTag.png')} style={[styles.tagImage, {marginLeft: -wp(1.79)}]} />}
                        {item.tags.indexOf("veganism") > -1 && <Image source={require('../../../assets/images/veganismTag.png')} style={[styles.tagImage, {marginLeft: -wp(1.79)}]} />}
                        {item.tags.indexOf("meat") > -1 && <Image source={require('../../../assets/images/meatTag.png')} style={[styles.tagImage, {marginLeft: -wp(1.79)}]} />}
                        {item.tags.indexOf("fish") > -1 && <Image source={require('../../../assets/images/fishTag.png')} style={[styles.tagImage, {marginLeft: -wp(1.79)}]} />}
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
            
            {!isInCart(item) &&
            (<TouchableOpacity onPress={() => chooseMessage(item, true)} style={styles.littleButton}>
                <Text style={styles.buttonText}>{item.dishPrice}р</Text>
            </TouchableOpacity>)}
            {isInCart(item) && 
            (<View style={styles.amountBlock}>
                <TouchableOpacity onPress={() => handleCartChoice(item, false)}
                  style={styles.signButton}>
                  <Image style={styles.sign} source={require('../../../assets/images/minusGreen.png')}/>
                </TouchableOpacity>
                <Text style={styles.amountText}>{countAmountInCart(item)}</Text>
                <TouchableOpacity onPress={() => {handleCartChoice(item, true)}}
                  style={styles.signButton}>
                    <Image style={styles.sign} source={require('../../../assets/images/plusGreen.png')}/>
                </TouchableOpacity>
            </View>)}
            
            
        </TouchableOpacity>
    );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}} >
        <View style={styles.topMenu}>
            {searchIconVisibility && (
                <View style={{width: wp(11.8)}}>
                    <TouchableOpacity onPress={() => setSearchIconVisibility(false)}>
                        <Image source={require('../../../assets/images/searchButton.png')} style={styles.search}/>
                    </TouchableOpacity>
                </View>
            )}
            {!searchIconVisibility && (
                <View style={{height: hp(7.82)}}>
                    <View style={styles.searchBarBox}>
                        <TextInput value={search} style={styles.searchInput}
                        placeholder='Поиск' placeholderTextColor={colors.grey2}
                        onChangeText={(s) => setSearch(s)}
                        onEndEditing={() => searchForDishesByNameSection()} />
                        <TouchableOpacity style={[styles.searchButton]} onPress={() => setSearchIconVisibility(true)}>
                            <Image source={require('../../../assets/images/search.png')} style={styles.searchImage} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {searchIconVisibility && (
            <View style={{width: wp(88.2)}}>
                <FlatList data={dishesIntro} 
                    renderItem={({ item }) => <ItemRender name={item.name} id={item.id} />} keyExtractor={item => item.id}
                    horizontal={true} />
            </View>
            )}   
        </View>
        <FlatList numColumns={2} data={dishes} 
            renderItem={RenderItem}
            keyExtractor={item => item.id} />
            <AppearingDeliveryDishModal activeItem={activeItem}  
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
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowColor: colors.black,
        shadowRadius: wp(2.05),
        shadowOpacity: 0.15,
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
        justifyContent: 'space-between',
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
        width: wp(23.2),
        //justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    tagImage: {
        width: wp(6.92),
        height: hp(2.84),
        aspectRatio: 1,
        borderColor: 'red',
    },
    middleBlock: {
        width: wp(37.44),
        height: hp(5.92),
        marginBottom: hp(0),
        marginTop: hp(8),
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        height: hp(4.45),
        width: hp(4.45),
        marginLeft: wp(4.1),
        shadowColor: 'rgba(0, 0, 0, 0.18)',
        shadowOffset: {width: wp(0), height: hp(0.12)},
        shadowRadius: wp(2.1),
        shadowOpacity: 1,
        marginTop: hp(2)
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
    amountBlock: {
        width: wp(40.51),
        height: hp(3.8),
        borderRadius: hp(2.61),
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    amountText: {
        color: colors.black,
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        fontFamily: 'SF-Pro-Regular',
        marginHorizontal: wp(10),
    },
    sign: {
        height: hp(2.5),
        width: hp(2.6),
        alignSelf: 'center',
    },
    signButton: {
      width: wp(8),
      height: hp(5),
      justifyContent: 'center',
    },

    searchBarBox: {
        height: hp(4.74),
        width: wp(91.8),
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