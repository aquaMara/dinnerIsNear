import { StyleSheet, Text, View, Alert, TouchableOpacity, Image, Dimensions } from 'react-native'
import { useEffect, useState } from 'react';
import React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';

import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';

import { colors } from '../../styles/colors';
import markersList from '../../data/markersList';

import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const { height } = Dimensions.get('screen');

export default function FirstMapScreen() {

  const [markers, setMarkers] = useState([]);
  const [fs, setFs] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);

  const LOCATION_TASK_NAME = 'background-location-task';
  
  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
      return;
    }
    if (data) {
      const { locations } = data;
      // do something with the locations captured in the background
    }
  });

  useEffect(()=> {
    
    (async () => {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus === 'granted') {
        setFs(foregroundStatus);
        let {coords} = await Location.getCurrentPositionAsync();
        console.log('LOCATION', coords);
        setCurrentLatitude(coords.latitude);
        setCurrentLongitude(coords.longitude);
        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus === 'granted') {
          await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.Balanced,
          });
        }
      }
    })();

    setMarkers(markersList);
  }, []);

  return (
    <View style={styles.container}>
		<MapView
			showsMyLocationButton={true}
			showsCompass={true}
			style={styles.map} userInterfaceStyle='light'
      showsPointsOfInterest={true}
			initialRegion={{latitude: 55.753247529963446, longitude: 37.6020154928286,
                      latitudeDelta: 0.0843, longitudeDelta: 0.0834}}
			loadingEnabled={false}>
			{markers.map((marker, id) => (
			<Marker key={id} pinColor={colors.white}
				coordinate={{ latitude: marker.latitude, longitude: marker.longitude}}
				title={marker.name} description={marker.description}>
				<Image source={require('../../assets/images/whitePin.png')} style={styles.greenPin} />
				<Callout style={[styles.restrauntSquare]}>
					<Image source={{uri: marker.path}} style={styles.restrauntPicture} />
						<View style={styles.restrauntTextBlock}>
						<Text style={styles.restrauntText}>{marker.name}</Text>
					</View>
				</Callout>
			</Marker>
			))}
      {currentLatitude > 0 && 
      <Marker pinColor={colors.green} style={styles.greenPin}
        coordinate={{ latitude: currentLatitude, longitude: currentLongitude}} >
        <Image source={require('../../assets/images/greenPin2.png')} style={styles.greenPin} />
      </Marker>
      }
		</MapView>
	  </View>
  )
}

const styles = StyleSheet.create({
  	container: {
		backgroundColor: colors.white,
		alignItems: "center",
		height: hp(100),
		width: wp(100)
	},
	map: {
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
})