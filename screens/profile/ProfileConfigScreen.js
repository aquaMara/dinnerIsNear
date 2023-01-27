import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { useFonts } from 'expo-font';
import { globalStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height } = Dimensions.get('screen');

export default function ProfileConfigScreen() {

    const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
    });
        
    if (!fontsLoaded) {
        return null;
    }

  return (
    <ScrollView>
      <Text>ProfileConfigScreen</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})