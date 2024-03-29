import { StyleSheet, Text, TextInput, View, Dimensions, Image, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { colors } from '../../../styles/colors';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import restsIntroduction from '../../../data/restsIntroduction';
import markersList from '../../../data/markersList';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import { getDistance } from 'geolib';
import { useAuth } from '../../../auth/AuthProvoder';

const { height } = Dimensions.get('screen');

export default function Restaurants({route}) {

  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const {latitude, setLatitude, longitude, setLongitude} = useAuth();

  const moveToRestaurant = async  (id, name, mealId) => {
    let trueTags = await getTags();
    let trueProTags = await getProTags();
    let weekTags = await getWeekTags();
    console.log('weekTags',weekTags, 'trueTags', trueTags, 'trueProTags', trueProTags)
    navigation.navigate("RestaurantMenu",
      {title: name, restrauntId: id, mealId: mealId, trueTags: trueTags, trueProTags: trueProTags, weekTags: weekTags});
  }

  const getTags = async () => {
    let trueTagsData = await SecureStore.getItemAsync('trueTags');
    if (trueTags == null) {
      return [];
    }
    let trueTags = JSON.parse(trueTagsData)
    return trueTags;
  }

  const getProTags = async () => {
    let trueTagsData = await SecureStore.getItemAsync('trueProTags');
    let trueProTags = JSON.parse(trueTagsData);
    if (trueProTags == null) {
      return [];
    }
    return trueProTags;
  }

  const getWeekTags = async () => {
    let weekTagsData = await SecureStore.getItemAsync('weekTags');
    let weekTags = JSON.parse(weekTagsData);
    if (weekTags == null) {
      return [];
    }
    return weekTags;
  }

  const searchForRestraunt = () => {
    console.log(search, 'search', search.trim());
    let withDistance = addDistance(markersList);
    sortByDistance(withDistance);
    if (search.trim().length > 0) {
      let searchedRestaurants = withDistance.filter(obj => {
        return obj.name.toLowerCase().includes(search.trim().toLowerCase());
      })
      setRestaurants(searchedRestaurants);
    } else {
      setRestaurants(withDistance);
    }
  }
  /*
  const searchForRestraunt = () => {
    console.log(search, 'search', search.trim());
    if (search.trim().length > 0) {
      let searchedRestaurants = markersList.filter(obj => {
        return obj.name.toLowerCase().includes(search.trim().toLowerCase());
      })
      
      setRestaurants(searchedRestaurants);
    } else {
      setRestaurants(markersList);
    }
  }
  */

  const handleDistanceCount = (item) => {
    var distanceBetweenPointsObject = getDistance(
      {latitude: latitude, longitude: longitude},
      {latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude)},
      );
    let distanceBetweenPoints = {distanceBetweenPointsObject}
    let distanceKM = distanceBetweenPoints.distanceBetweenPointsObject / 1000;

    return distanceKM;
  }

  const addDistance = (rests) => {
    let withDistance = rests.map(function(item){
      var distanceBetweenPointsObject = getDistance(
        {latitude: latitude, longitude: longitude},
        {latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude)},
        );
      let distanceBetweenPoints = {distanceBetweenPointsObject}
      let distanceKM = parseInt(distanceBetweenPoints.distanceBetweenPointsObject / 1000, 10);
      return {...item, distanceKM: distanceKM};
    })
    return withDistance;
  }

  const sortByDistance = (rests) => {
     rests.sort((a, b) => {
      if (a.distanceKM < b.distanceKM)
        return -1;
      if (a.distanceKM > b.distanceKM)
        return 1;
      return 0;
    });

    /*
    for (let i = 0; i < rests.length; i++) {
      console.log(rests[i].distanceKM)
    }
    */
  }

  const renderRestaurant = ({item}) => (
    item.distanceKM != null && (<TouchableOpacity style={styles.restaurantBlock}
      onPress={() => moveToRestaurant(item.id, item.name, route.params.mealId)}>
      <View style={styles.topBlock}>
        <ImageBackground source={{uri: item.image}} style={styles.restaurantImage} imageStyle={{borderRadius: hp(2.37)}} >
          <LinearGradient 
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']}
            locations={[0, 1]}
            style={styles.restaurantImage} />
        </ImageBackground>
        <View style={{marginRight: wp(2.31), marginLeft: 'auto', marginBottom: hp(1.07), marginTop: 'auto'}}>
          <Text style={styles.restrauntDestinationText}>~ в {item.distanceKM} км от меня</Text>
        </View>
      </View>
      <View style={styles.bottomBlock}>
        <View style={styles.restrauntButton}>
          <Text style={styles.restaurantTitleText}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>)
  );

  useEffect(() => {
    let withDistance = addDistance(markersList);
    sortByDistance(withDistance);
    setRestaurants(withDistance);
  }, []);

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
  });
    
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{height: hp(7.82)}}>
        <View style={styles.searchBarBox}>
          <TextInput value={search} style={styles.searchInput}
            placeholder='Поиск' placeholderTextColor={colors.grey2}
            onChangeText={(s) => setSearch(s)}
            onEndEditing={() => searchForRestraunt()} />
          <TouchableOpacity style={styles.searchButton} onPress={() => searchForRestraunt()}>
            <Image source={require('../../../assets/images/search.png')} style={styles.searchImage} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList numColumns={2} data={restaurants} 
        renderItem={renderRestaurant} keyExtractor={item => item.id} />
    </View>
  )
}

const styles = StyleSheet.create({
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
  restaurantBlock: {
    height: hp(25.7),
    width: wp(43.6),
    marginTop: hp(2.49),
    marginLeft: wp(4.1),
    borderRadius: wp(5.13),
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {width: wp(0), height: hp(0.12)},
    shadowRadius: wp(2.1),
    shadowOpacity: 0.18,
  },
  topBlock: {
    height: hp(20.14),
    width: wp(43.6),
    borderRadius: wp(5.13),
  },
  bottomBlock: {
    height: hp(5.57),
    width: wp(43.6),
    borderBottomLeftRadius: wp(5.13),
    borderBottomRightRadius: wp(5.13),
  },
  restaurantImage: {
    height: hp(20.14),
    width: wp(43.5),
    borderRadius: wp(5.13),
  },
  restrauntDestinationText: {
    fontSize: RFValue(13, height),
    lineHeight: hp(1.84),
    fontFamily: 'SF-Pro-Regular',
    color: colors.separator,
  },
  restrauntButton: {
    height: hp(3.79),
    width: wp(40.51),
    marginTop: hp(1.07),
    marginHorizontal: wp(1.54),
    backgroundColor: colors.systemLight,
    borderRadius: wp(5.13),
    justifyContent: 'center',

  },
  restaurantTitleText: {
    fontSize: RFValue(17, height),
    lineHeight: hp(2.4),
    fontFamily: 'SF-Pro-Bold',
    textAlign: 'center',
    color: colors.black,
  },
})

/*
<TouchableOpacity style={{marginBottom: hp(17.06), marginTop: 'auto', marginLeft: wp(2.82)}}>
            <Image source={require('../../../assets/images/heart.png')} style={styles.heartImage} />
          </TouchableOpacity>

          
  heartImage: {
    height: hp(1.66),
    width: wp(4.1),
    borderWidth: 0.6,
  },

          */