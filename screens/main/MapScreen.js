import React from 'react';
import { colors } from '../../styles/colors';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
///import YaMap from 'react-native-yamap';
import MapView, { Callout, Marker, Circle } from 'react-native-maps';
import { Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import YaMap from 'react-native-yamap';


export const MapScreen = () => {


  return (
    <YaMap
      userLocationIcon={{ uri: 'https://www.clipartmax.com/png/middle/180-1801760_pin-png.png' }}
      initialRegion={{
        lat: 50,
        lon: 50,
        zoom: 10,
        azimuth: 80,
        tilt: 100
      }}
      style={{ flex: 1 }}
    />
  )
};

const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	}
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