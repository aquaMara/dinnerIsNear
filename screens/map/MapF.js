import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import React from 'react'
import ModalTest from './ModalTest';
import ModalTest2 from './ModalTest2';

export default function MapF() {
    const [v, setV] = useState(false);
    const testV = (param) => {
        //console.log('param 1 ', param);
        setV(v);
        //console.log('param 2 ', v);
    }

    const [visibility, setVisibility] = useState(false);
    const chooseMessage = (message) => {
        setVisibility(message);
    };
    
  return (
    <View style={{backgroundColor: 'green'}}>
        <TouchableOpacity onPress={() => setVisibility(!visibility)}>
            <Text>press</Text>
        </TouchableOpacity>
        {visibility && <Text>h</Text>}
        <ModalTest2 chooseMessage={chooseMessage} visibility={visibility} />
    </View>
  )
}
// <ModalTest testV={testV} v={v} />
// <ModalTest chooseMessage={chooseMessage} v={v} />

const styles = StyleSheet.create({})