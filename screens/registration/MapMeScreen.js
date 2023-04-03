import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { useEffect, useState } from 'react';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../styles/colors';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { useAuth } from '../../auth/AuthProvoder';
import { globalStyles } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('screen');

export default function MapMeScreen() {

  const navigation = useNavigation();
  const {latitude, setLatitude, longitude, setLongitude, address, setAddress} = useAuth();
  const [fs, setFs] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const LOCATION_TASK_NAME = 'background-location-task';
  //const [address, setCfddress] = useState(null);
  const [initRegion, setInitRegion] = useState(null);
  
  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      return;
    }
    if (data) {
      const { location } = data;
    }
  });

  const handleDragEnd = async (coordinates) => {
	//  draggable={true} onDragEnd={(e) => handleDragEnd(e.nativeEvent.coordinate)}
	console.log('dragEnd', coordinates);
	setLatitude(coordinates.latitude);
	setLongitude(coordinates.longitude);
	setCurrentLatitude(coordinates.latitude);
    setCurrentLongitude(coordinates.longitude);
	if (coordinates) {
		const { latitude, longitude } = coordinates;
		let response = await Location.reverseGeocodeAsync({
			latitude,
			longitude
		});
		for (let item of response) {
			  let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
			  if (item.street != null && item.streetNumber != null) {
				setAddress(item.street + ', ' + item.streetNumber);
			  } else if (item.street != null && item.streetNumber == null) {
				setAddress(item.street)
			  } else {
				setAddress('Название не определено');
			  }
		}
	}        
	
  }

  useEffect(()=> {
    (async () => {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus === 'granted') {
        setFs(foregroundStatus);
        let {coords} = await Location.getCurrentPositionAsync();
		if (coords) {
			const { latitude, longitude } = coords;
			let response = await Location.reverseGeocodeAsync({
			  latitude,
			  longitude
			});
			console.log('response', response)
			for (let item of response) {
				let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
				if (item.street != null && item.streetNumber != null) {
					setAddress(item.street + ', ' + item.streetNumber);
				  } else if (item.street != null && item.streetNumber == null) {
					setAddress(item.street)
				  } else {
					setAddress('Название не определено');
				  }
			}
		}
		
        console.log('LOCATION', coords);
		setLatitude(coords.latitude);
		setLongitude(coords.longitude);
        setCurrentLatitude(coords.latitude);
        setCurrentLongitude(coords.longitude);
		setInitRegion({latitude: coords.latitude, longitude: coords.longitude,
			latitudeDelta: 0.0843, longitudeDelta: 0.0834})

        /*
		const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus === 'granted') {
          await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.Lowest,
          });
        }
		*/
      }
    })();

  }, []);

  const [fontsLoaded] = useFonts({
    'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
    'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
    'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
  });
        
  if (!fontsLoaded) {
    return null;
  }
/*
initialRegion={currentLatitude == 0 ? 
				{latitude: 55.753247529963446, longitude: 37.6020154928286,
                      latitudeDelta: 0.0843, longitudeDelta: 0.0834}
				:{latitude: currentLatitude, longitude: currentLongitude,
						latitudeDelta: 0.0843, longitudeDelta: 0.0834}}
						*/
  return (
    <View style={styles.container}>
		{initRegion == null
		? (<View style={{marginTop: hp(10), width: wp(70), height: hp(30)}}>
			<Text style={styles.addressText}>Загрузка...</Text>
		</View>)
		: (<MapView
			showsMyLocationButton={true}
			showsCompass={true}
			style={styles.map} userInterfaceStyle='light'
      		showsPointsOfInterest={true}
			initialRegion={initRegion}
			loadingEnabled={true}>
			{currentLatitude > 0 && 
			<Marker pinColor={colors.green} style={styles.greenPin}
				coordinate={{ latitude: currentLatitude, longitude: currentLongitude}} 
				draggable={true} onDragEnd={(e) => handleDragEnd(e.nativeEvent.coordinate)}>
				<Image source={require('../../assets/images/greenPin2.png')} style={styles.greenPin} />
			</Marker>
			}
		</MapView>)}
		{address != null && (
		<View style={styles.addressBlock}>
			<Text style={styles.addressText}>{address}</Text>
		</View>
		)}
		<View style={styles.button}>
		<TouchableOpacity style={globalStyles.mainButton} 
			onPress={() => navigation.navigate('Tab')}>
			<Text style={styles.buttonText}>Я здесь</Text>
		</TouchableOpacity>
		</View>
	</View>
  )
}
/*
{address != '' && (
		<View style={{height: hp(10), width: wp(85.9), marginBottom: hp(40), marginTop: 'auto'}}>
			<Text style={styles.addressText}>{address}</Text>
		</View>
		)}
		<View style={styles.button}>
		<TouchableOpacity style={globalStyles.mainButton} 
			onPress={() => navigation.navigate('Tab')}>
			<Text style={styles.buttonText}>Я здесь</Text>
		</TouchableOpacity>
		</View>
		*/
const styles = StyleSheet.create({
  	container: {
		backgroundColor: colors.white,
		alignItems: "center",
		height: hp(100),
		width: wp(100),
	},
	map: {
		height: hp(100),
		width: wp(100),
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
		width: wp(10.96),
		height: hp(6.75),
		height: hp(6.19)
	},
	whitePin: {
		width: wp(8.92),
		width: wp(6.92),
		height: hp(6.03),
		height: hp(4.03)
	},
	button: {
		marginBottom: hp(5.57),
		marginTop: 'auto',
	},
	addressBlock: {
		height: hp(10),
		width: wp(85.9),
		marginBottom: hp(140),
		marginTop: 'auto'
	},
	addressText: {
		fontFamily: 'SF-Pro-Bold',
        fontSize: RFValue(34, height),
        lineHeight: hp(4.81),
        color: colors.black,
		textAlign: 'center'
	}
})