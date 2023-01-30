import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Dimensions, Pressable, View, TouchableOpacity, Image } from "react-native";
import { colors } from '../../../styles/colors';
import { useFonts } from "expo-font";
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { globalStyles } from "../../../styles/styles";
import GestureRecognizer from 'react-native-swipe-gestures';
import { useShoppingCart } from '../../../auth/ShoppingCartProvider';

const { height } = Dimensions.get('screen');

export default function AppearingDishDescriptionModal({chooseMessage, visibility, item, mealId}) {

  const [modalVisibleIntro, setModalVisibleIntro] = useState(false);
  const { cart, setCart } = useShoppingCart();
  console.log('h', mealId);
  console.log('itemitem', item);

  const handleCartChoice = (item) => {
      setModalVisibleIntro(!modalVisibleIntro);
      chooseMessage(false);
      // !!!
      //const mealId = 1;
      const {id, dishName, dishCalories, dishProtein, dishFats, dishCarbohydrates, dishPrice} = item;
      // dishId = 1 in newElement заменить !!!
      const cartItem = {mealId, id, dishName, dishCalories, dishProtein, dishFats, dishCarbohydrates, dishPrice}
      console.log('cartItem', cartItem)
      setCart(cart => [...cart, cartItem]);
      console.log(cart)
  }

  useEffect(() => {
      //console.log('modalVisible ', modalVisible);
      //setModalVisibleIntro(modalVisible);
  }, []);

  const [fontsLoaded] = useFonts({
      'SF-Pro-Regular': require('../../../assets/fonts/SFPro400.otf'),
      'SF-Pro-Medium': require('../../../assets/fonts/SFPro500.otf'),
      'SF-Pro-Bold': require('../../../assets/fonts/SFPro700.otf'),
    });
    
    if (!fontsLoaded) {
      return null;
    }

  return (
    <GestureRecognizer onSwipeDown={() => chooseMessage(false)}>
      <Modal 
        animationType="slide" transparent={true}
        visible={visibility} style={styles.modalStyle}>
          <View style={[styles.centeredView, modalVisibleIntro && {backgroundColor: 'rgba(0, 0, 0, 0.4)'}]}>
            <View style={styles.modalView}>
                {console.log(item.dishCalories)}
                <Image source={require('../../../assets/images/dish.png')} style={styles.image} />
                <View style={styles.topLine}>
                    <View style={{width: wp(47.95)}}>
                        <Text style={styles.dishTitle} numberOfLines={2} ellipsizeMode='tail'>{item.dishName}</Text>
                    </View>
                    <View style={{width: wp(13.77), marginLeft: 'auto', marginRight: 0}}>
                        <Text style={[styles.dishTitle, {textAlign: 'right'}]}>290р</Text>
                        <Text style={[styles.dishDescription, {marginTop: hp(0.47), textAlign: 'right', opacity: 0.4}]}>0,250кг</Text>
                    </View>
                </View>
                <Image source={require('../../../assets/images/rectangle9.png')} style={styles.topLineImage}/>
                <View style={styles.middleLine}>
                    <View style={styles.middleBlock}>
                        <Text style={[styles.dishTitle, {textAlign: 'center'}]}>{item.dishCalories}</Text>
                        <Text style={[styles.dishDescription, {textAlign: 'center', opacity: 0.4}]}>ккал</Text>
                    </View>
                    <View style={styles.middleBlock}>
                        <Text style={[styles.dishTitle, {textAlign: 'center'}]}>{item.dishProtein}</Text>
                        <Text style={[styles.dishDescription, {textAlign: 'center', opacity: 0.4}]}>белки</Text>
                    </View>
                    <View style={styles.middleBlock}>
                        <Text style={[styles.dishTitle, {textAlign: 'center'}]}>{item.dishFats}</Text>
                        <Text style={[styles.dishDescription, {textAlign: 'center', opacity: 0.4}]}>жиры</Text>
                    </View>
                    <View style={styles.middleBlock}>
                        <Text style={[styles.dishTitle, {textAlign: 'center'}]}>{item.dishCarbohydrates}</Text>
                        <Text style={[styles.dishDescription, {textAlign: 'center', opacity: 0.4}]}>углеводы</Text>
                    </View>
                </View>
                <View style={styles.bottomLine}>
                    <Text style={[styles.dishDescription, {textAlign: 'left'}]}>Состав</Text>
                    <Text style={[styles.dishDescription, {textAlign: 'justify', opacity: 0.6, marginTop: hp(0.83)}]} numberOfLines={3} ellipsizeMode='tail'>
                        Филе грудки цыплёнка, салат ромейн, салат айсберг, яйцо, сыр пармезан, томаты черри, гренки, соус цезарь (обращаем ваше внимание, что подача соуса изменилась).
                        </Text>
                </View>
                <TouchableOpacity style={[globalStyles.mainButton, {marginTop: hp(4.74)}]} onPress={() => handleCartChoice(item)}>
                    <Text style={styles.buttonText}>В корзину</Text>
                </TouchableOpacity>
            </View>
          </View>
    </Modal>
    </GestureRecognizer>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: wp(100),
    height: hp(67.9),
    marginBottom: 0,
    marginTop: 'auto',
    backgroundColor: "white",
    borderTopLeftRadius: wp(5.13),
    borderTopRightRadius: wp(5.13),
    alignItems: "center",
    shadowColor: 'rgba(0, 0, 0, 0.18)',
    shadowOffset: {width: wp(0), height: hp(0.12)},
    shadowRadius: wp(2.1),
    shadowOpacity: 1,
  },
  littleButton: {
      width: wp(40.51),
      height: hp(3.8),
      backgroundColor: colors.green,
      borderRadius: hp(2.61),
      justifyContent: 'center',
      alignContent: 'center',
  },
  buttonText: {
      color: colors.white,
      fontSize: RFValue(17, height),
      lineHeight: hp(2.4),
      fontFamily: 'SF-Pro-Bold',
      textAlign: 'center',
  },
  image: {
      width: wp(91.8),
      height: hp(17.78),
      marginTop: hp(1.9),
      borderRadius: wp(2.31),
  },
  topLine: {
      width: wp(91.8),
      height: hp(5.74),
      marginTop: hp(2.49),
      display: 'flex',
      flexDirection: 'row',
  },
  dishTitle: {
      color: colors.black,
      fontSize: RFValue(17, height),
      lineHeight: hp(2.4),
      fontFamily: 'SF-Pro-Medium',
  },
  dishDescription: {
      color: colors.black,
      fontSize: RFValue(13, height),
      lineHeight: hp(1.84),
      fontFamily: 'SF-Pro-Regular',
  },
  topLineImage: {
      height: hp(0.06),
      width: wp(95.9),
      marginLeft: wp(4.1),
      marginVertical: hp(2.49),
  },
  middleLine: {
      width: wp(91.8),
      height: hp(7.7),
      borderRadius: wp(5.13),
      backgroundColor: 'rgba(242, 242, 247, 1)',
      display: 'flex',
      flexDirection: 'row',
      //justifyContent: 'center',
      alignItems: 'center'
  },
  middleBlock: {
      height: hp(4.57),
      width: wp(16.1),
      marginHorizontal: wp(3),
  },
  bottomLine: {
      width: wp(91.8),
      height: hp(8.41),
      marginTop: hp(2.49),
  },
  buttonText: {
      color: colors.white,
      fontSize: RFValue(17, height),
      lineHeight: hp(2.4),
      fontFamily: 'SF-Pro-Medium',
      textAlign: 'center',
  },
})