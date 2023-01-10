import React from 'react';
import { colors } from '../../styles/colors';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
///import YaMap from 'react-native-yamap';
import MapView, { Callout, Marker, Circle } from 'react-native-maps';
import { Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { globalStyles } from '../../styles/styles';
import { useFonts } from 'expo-font';

const { height } = Dimensions.get('screen');
// 690
// 320


export const MapScreen = ({navigation, route}) => {

  const [location, setLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

    const [ pin, setPin ] = React.useState({
		latitude: 37.78825,
		longitude: -122.4324
	})
	const [ region, setRegion ] = React.useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})

	const GetCurrentLocation = async () => {
		
	  
		let { coords } = await Location.getCurrentPositionAsync();
	  
		if (coords) {
		  const { latitude, longitude } = coords;
		  /*
		  let response = await Location.reverseGeocodeAsync({
			latitude,
			longitude
		  });
		  */
		  //let response = await Location.reverseGeocodeAsync({ latitude: -22.083389054737516, longitude: -41.86668248847127 })
		  let response = await Location.reverseGeocodeAsync({ latitude: 53.90532733955098, longitude: 27.47860573232174 })
	  
		  for (let item of response) {
			let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
	  
			console.log('address ', response)
		  }
		}
	  };

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        
          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
            })
          setInitialRegion({
            latitude: parseFloat(location.coords.latitude),
			longitude: parseFloat(location.coords.longitude),
			latitudeDelta: 0.0043,
            longitudeDelta: 0.0034
          })
        })()
	  
		GetCurrentLocation();
        

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
    <View style={styles.container}>
		<View style={styles.searchBlock}>
			<GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(data, details)
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					})
				}}
				query={{
					key: "",
					language: "ru",
					components: "country:by",
					types: "establishment",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: styles.searchContainer,
					listView: { backgroundColor: "white" },
					textInput: styles.searchInput
				}}
			/>
			<View styles={{borderWidth: 1}}>
				<Image source={require('../../assets/images/search.png')} style={styles.searchImage} />
			</View>
		</View>
			<MapView
			showsMyLocationButton={true}
			showsCompass={true}
			showsUserLocation={true}
				style={styles.map}
				initialRegion={initialRegion}
				customMapStyle={{backgroundColor: 'blue'}}
				provider="google"
				followsUserLocation={true}
				loadingEnabled={true}
			>
				<Marker
					coordinate={location}
					pinColor={colors.green}
					draggable={true}
					onDragStart={(e) => {
						console.log("Drag start", e.nativeEvent.coordinate)
					}}
					onDragEnd={(e) => {
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude
						})
						console.log("PIN ", e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
					}} >
					<Callout>
						<Text>I'm here</Text>
					</Callout>
				</Marker>
			
			</MapView>
			
			<TouchableOpacity style={[globalStyles.mainButton, {marginTop: -hp(18.57)}]} onPress={() => navigation.navigate('Recommendation')}>
				<Text style={styles.buttonText}>Я здесь</Text>
			</TouchableOpacity>
			
		</View>
  );
};

const styles = StyleSheet.create({
    container: {
		//flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		height: hp(100),
		width: wp(100)

	},
	map: {
		//width: Dimensions.get("window").width,
		//height: Dimensions.get("window").height,
		height: hp(100),
		width: wp(100)
	},
	searchBlock: {
		zIndex: 1,
		position: "absolute",
		marginTop: hp(8.1),
        width: wp(91.8),
        height: hp(3.63),
	},
    searchContainer: {
        width: wp(91.8),
		height: hp(4.73),
    },
	searchInput: {
		borderRadius: hp(20.37),
		width: wp(91.8),
        height: hp(4.73),
	},
	searchImage: {
		width: wp(4.62),
		height: wp(4.62),
		zIndex: 2,
		marginLeft: wp(81.8),
		
	},
	buttonText: {
		color: colors.white,
		fontSize: RFValue(17, height),
		lineHeight: hp(2.4),
		fontFamily: 'SF-Pro-Bold',
	},
  });

  /*

<View>
        {
            initialRegion && (
                <View style={{ marginTop: 0, flex: 1 }}>
                    <GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
                keepResultsAfterBlur={true}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(data, details)
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					})
				}}
				query={{
					key: "KEY",
					language: "en",
					components: "country:us",
					types: "establishment",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "80%", zIndex: 1, marginTop: 30 },
					listView: { backgroundColor: "white" }
				}}
			/>
			
			<MapView
				style={styles.map}
				initialRegion={initialRegion}
				provider="google"
			>
				<Marker
					coordinate={pin}
					pinColor={colors.green}
					draggable={true}
					onDragStart={(e) => {
						console.log("Drag start", e.nativeEvent.coordinate)
					}}
					onDragEnd={(e) => {
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude
						})
					}}
				>
					</Marker>
			</MapView>
		</View>
            )
        }
    </View>
  */