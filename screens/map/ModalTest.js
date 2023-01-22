import { StyleSheet, Text, View, Modal } from 'react-native';
import { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import React from 'react'

export default function ModalTest({chooseMessage, visibility}) {
  console.log('visibility is  ', visibility, ' is visibility');
  const [modalVisible, setModalVisible] = useState(visibility);
// <Text>Swipe Down Please</Text>
  return (
    <GestureRecognizer on
        onSwipeUp={() => chooseMessage(true)}
        onSwipeDown={() => chooseMessage(false)}>
        <Modal 
            animationType="slide" transparent={true}
            visible={visibility} style={styles.modalStyle}>
            <View style={styles.viewStyle}>
                <Text>Swipe Down Please</Text>
            </View>
        </Modal>
    </GestureRecognizer>
  )
}
// 
const styles = StyleSheet.create({
    modalStyle: {
        backgroundColor: 'red',
        width: 300,
        height: 400,
    },
    viewStyle: {
        backgroundColor: 'yellow',
        width: 300,
        height: 400,
        marginBottom: 0,
        marginTop: 'auto',
    }
})