import { Dimensions, StyleSheet } from 'react-native';
import { colors } from './colors';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height } = Dimensions.get('screen');

export const globalStyles =  StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  inner: {
    flex: 1,
    justifyContent: "flex-end"
  },
  mainButton: {
    backgroundColor: colors.green,
    width: wp(91.8),
    height: hp(7.12),
    borderRadius: wp(5.13),
    paddingVertical: hp(1.42),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  whiteButton: {
    backgroundColor: colors.white,
    width: wp(91.8),
    height: hp(7.12),
    borderRadius: wp(5.13),
    paddingVertical: hp(1.42),
    shadowColor: colors.black,
    shadowRadius: wp(2.05),
    shadowOffset: {width: wp(0), height: hp(0.12)},
    shadowOpacity: 0.18,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
/*

width: 300px;
height: 1px;
left: 0px;
top: 29px;

background: #000000;
border-radius: 8px;
*/