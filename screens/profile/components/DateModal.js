import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Dimensions, Pressable, View, TouchableOpacity, Image } from "react-native";
import { colors } from '../../../styles/colors';
import { useFonts } from "expo-font";
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { globalStyles } from "../../../styles/styles";
import GestureRecognizer from 'react-native-swipe-gestures';

const { height } = Dimensions.get('screen');

export default function DateModal({chooseMessage, visibility}) {

    const [modalVisibleIntro, setModalVisibleIntro] = useState(false);
    
  return (
    <GestureRecognizer onSwipeDown={() => chooseMessage(false)}>
      <Modal 
        animationType="slide" transparent={true}
        visible={visibility} style={styles.modalStyle}>
          <View style={[styles.centeredView, modalVisibleIntro && {backgroundColor: 'rgba(0, 0, 0, 0.4)'}]}>
            <Text>jhhjhhhg</Text>
          </View>
    </Modal>
    </GestureRecognizer>
  )
}

const styles = StyleSheet.create({})