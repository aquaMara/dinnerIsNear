import React from 'react';
import { colors } from '../../styles/colors';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
///import YaMap from 'react-native-yamap';
import MapView, { Callout, Marker, Circle, CalloutSubview } from 'react-native-maps';
import { Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { globalStyles } from '../../styles/styles';
import { useFonts } from 'expo-font';
import markersList from '../../data/markersList';
import AppearingRestrauntDescriptionModal from './AppearingRestrauntDescriptionModal';

const { height } = Dimensions.get('screen');

export default function MapMainScreen({navigation}) {

  const [location, setLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
	latitude: 55.753247529963446,
	longitude: 37.6020154928286,
	latitudeDelta: 0.0843,
    longitudeDelta: 0.0834
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [activeRestaurant, setActiveRestaurant] = useState(null);


  const [visibility, setVisibility] = useState(false);
  const setupVisibility = (marker) => {
	setVisibility(!visibility);
	setActiveRestaurant(marker);
  }
  const chooseMessage = (marker,message) => {
    setActiveRestaurant(marker);
	setVisibility(message);
  };

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
		setMarkers(markersList);


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
		<MapView
			showsMyLocationButton={true}
			showsCompass={true}
			showsUserLocation={true}
			style={styles.map}
			initialRegion={initialRegion}
			customMapStyle={{backgroundColor: 'blue'}}
			provider="google"
			followsUserLocation={true}
			loadingEnabled={true} >
			<Marker
				coordinate={location}
				pinColor={colors.green}
				draggable={false} >
				<Image source={require('../../assets/images/greenPin.png')} style={styles.greenPin} />
			</Marker>

			  {markers.map((marker, id) => (
				<Marker
				key={id}
				pinColor='white'
				coordinate={{ latitude: marker.latitude, longitude: marker.longitude}}
				title={marker.name}
				description={marker.description}
				>
					<Image source={require('../../assets/images/whitePin.png')} style={styles.whitePin} />
					<Callout style={[styles.restrauntSquare]} onPress={() => chooseMessage(marker, true)}>
						<Image source={{uri: marker.path}} style={styles.restrauntPicture} />
							<View style={styles.restrauntTextBlock}>
								<Text style={styles.restrauntText}>{marker.name}</Text>
						</View>
					</Callout>

				</Marker>
			  ))}
			  </MapView>
	</View>
  )
}
// <AppearingRestrauntDescriptionModal chooseMessage={chooseMessage} visibility={visibility} activeRestaurant={activeRestaurant} />

/*
<Marker
				coordinate={{ latitude : 55.663750 , longitude : 37.484914 }}
				pinColor={colors.white}
				title="Menza"
      			description="{marker.description}">
			<Callout>
				<Image source={require('../../assets/images/heart.png')} style={styles.heartImage} />
			</Callout>
  			</Marker>
*/

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
	restrauntSquare: {
		width: wp(38.46),
		height: hp(15.78),
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: wp(200),
	},
	restrauntPicture: {
		width: wp(33.33),
		height: hp(15.4),
		aspectRatio: 1,
	},
	restrauntTextBlock: {
		height: hp(7.46),
		width: wp(30.2),
		//borderWidth: 1,
		marginTop: hp(-8.06),
		marginLeft: wp(3.85),
		//marginLeft: wp(1.28),
		marginRight: 'auto',
		justifyContent: 'flex-end',
	},
	restrauntText: {
		color: colors.white,
		fontSize: RFValue(17, height),
		lineHeight: hp(2.4),
		fontFamily: 'SF-Pro-Medium',
		textAlign: 'left',
	},
	greenPin: {
		width: wp(14.62),
		height: hp(6.75),
	},
	whitePin: {
		width: wp(8.92),
		height: hp(6.03),
	},
})