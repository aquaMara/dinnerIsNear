import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react';
import React from 'react';
import MapView from 'react-native-maps';

import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';


export default function FirstMapScreen() {

  const [grantedStatus, setGrantedStatus] = useState(false);
  const [fs, setFs] = useState(false);
  const [bs, setBs] = useState(false);
  const [l, setL] = useState(null);
  const LOCATION_TASK_NAME = 'background-location-task';

  const requestPermissions = async () => {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === 'granted') {
      setFs(foregroundStatus);
      let {coords} = await Location.getCurrentPositionAsync();
      console.log('LOCATION', coords)
      setL(coords.latitude);
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
        });
      }
    }
  };
  
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

  const test = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log('s')
        if (status == 'granted') {
          setGrantedStatus(true);
        }
        if (status !== 'granted') {
          Alert.alert(
            'Разрешение на использование местоположения было отклонено',
            [
              {
                text: 'OK',
                style: 'default',
              },
            ],
          );
          return;
        }
  }

  useEffect(()=> {
    
  }, []);

  return (
    <View>
      <Text>Map 1 {grantedStatus && <Text>true</Text>} 2 {!grantedStatus && <Text>false</Text>} </Text>
      <TouchableOpacity onPress={test}>
        <Text>bnt</Text>
      </TouchableOpacity>
      <MapView
          initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{width: 200, height: 200}}
      />
      <TouchableOpacity onPress={requestPermissions}>
        <Text>bnt 2</Text>
      </TouchableOpacity>
      <Text>j{fs && <Text>true</Text>}j {!fs && <Text>false</Text>}</Text>
      <Text>j{bs && <Text>true</Text>}j {!bs && <Text>false</Text>}</Text>
      <Text>h{l}j</Text>
    </View>
  )
}

const styles = StyleSheet.create({})