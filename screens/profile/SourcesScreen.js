import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Linking } from 'react-native';
import { useFonts } from 'expo-font';
import { colors } from '../../styles/colors';
const { height } = Dimensions.get('screen');

export default function SourcesScreen() {

  const [fontsLoaded] = useFonts({
        'SF-Pro-Regular': require('../../assets/fonts/SFPro400.otf'),
        'SF-Pro-Medium': require('../../assets/fonts/SFPro500.otf'),
        'SF-Pro-Bold': require('../../assets/fonts/SFPro700.otf'),
  });

  return (
    <View style={{backgroundColor: colors.white, flex: 1, alignItems: 'center'}}>
      <View style={{width: wp(100), marginVertical: hp(2)}}>
        <Text style={styles.titleText}>Вся информация взята из следующих источников:</Text>
      </View>
      <View style={{width: wp(96)}}>
        <Text style={styles.sourceText}
            onPress={() => 
            Linking.openURL('https://kpfu.ru/staff_files/F794240730/Sbornik_materialov_XVI_Vserossijskogo_Kongressa_nutriciologov_i_dietologov.pdf')} >
            1. Вопросы питания</Text>
        <Text style={styles.sourceText}
            onPress={() => 
            Linking.openURL('https://docviewer.yandex.ru/view/194210596/?*=l9x12Nn2ZEjrGAo%2FoAUZlqqjsn57InVybCI6Imh0dHBzOi8vd3d3LmNwa21lZC5ydS9tYXRlcmlhbHMvRWxfQmlibGlvL0FrdHVhbERvYy9kaWV0b2xvZ2lqYS8zLnBkZiIsInRpdGxlIjoiMy5wZGYiLCJub2lmcmFtZSI6dHJ1ZSwidWlkIjoiMTk0MjEwNTk2IiwidHMiOjE2Nzg0NDg4OTU2OTEsInl1IjoiNDk4NjMwODY5MTY1OTU2NDI0OSIsInNlcnBQYXJhbXMiOiJ0bT0xNjc4MzAzOTUwJnRsZD1ydSZsYW5nPXJ1Jm5hbWU9My5wZGYmdGV4dD0lRDAlQkQlRDAlQjAlRDElODMlRDElODclRDAlQkQlRDElOEIlRDAlQjUrJUQwJUI4JUQxJTgxJUQxJTgxJUQwJUJCJUQwJUI1JUQwJUI0JUQwJUJFJUQwJUIyJUQwJUIwJUQwJUJEJUQwJUI4JUQxJThGKyVEMCVCRiVEMCVCRSslRDAlQkQlRDElODMlRDElODIlRDElODAlRDAlQjglRDElODYlRDAlQjglRDAlQkUlRDAlQkIlRDAlQkUlRDAlQjMlRDAlQjglRDAlQjgmdXJsPWh0dHBzJTNBLy93d3cuY3BrbWVkLnJ1L21hdGVyaWFscy9FbF9CaWJsaW8vQWt0dWFsRG9jL2RpZXRvbG9naWphLzMucGRmJmxyPTIxMyZtaW1lPXBkZiZsMTBuPXJ1JnNpZ249NmY1NGJmMWI1YTgzMDFkZDBkNjZhZDUyZDM1MmE0Yzcma2V5bm89MCZub3N3PSJ9&amp;lang=ru')} >
            2. Основы здорового питания</Text>
        <Text style={styles.sourceText}
            onPress={() => 
            Linking.openURL('https://docviewer.yandex.ru/view/194210596/?*=jLhjox5UEOnFEjFTtQmkvDT%2BIJ17InVybCI6Imh0dHBzOi8vd3d3LnZuaWltcC5ydS9uZXRjYXRfZmlsZXMvdXNlcmZpbGVzL3ZuaWltcC9uZXdzLzIwMTkvU0JPUk5JS19ET0tMQURPVl8zLXlfTU5QS19GUFAucGRmIiwidGl0bGUiOiJTQk9STklLX0RPS0xBRE9WXzMteV9NTlBLX0ZQUC5wZGYiLCJub2lmcmFtZSI6dHJ1ZSwidWlkIjoiMTk0MjEwNTk2IiwidHMiOjE2Nzg0NDg5Nzc2MjgsInl1IjoiNDk4NjMwODY5MTY1OTU2NDI0OSIsInNlcnBQYXJhbXMiOiJ0bT0xNjc4MzAzOTUwJnRsZD1ydSZsYW5nPXJ1Jm5hbWU9U0JPUk5JS19ET0tMQURPVl8zLXlfTU5QS19GUFAucGRmJnRleHQ9JUQwJUJEJUQwJUIwJUQxJTgzJUQxJTg3JUQwJUJEJUQxJThCJUQwJUI1KyVEMCVCOCVEMSU4MSVEMSU4MSVEMCVCQiVEMCVCNSVEMCVCNCVEMCVCRSVEMCVCMiVEMCVCMCVEMCVCRCVEMCVCOCVEMSU4RislRDAlQkYlRDAlQkUrJUQwJUJEJUQxJTgzJUQxJTgyJUQxJTgwJUQwJUI4JUQxJTg2JUQwJUI4JUQwJUJFJUQwJUJCJUQwJUJFJUQwJUIzJUQwJUI4JUQwJUI4JnVybD1odHRwcyUzQS8vd3d3LnZuaWltcC5ydS9uZXRjYXRfZmlsZXMvdXNlcmZpbGVzL3ZuaWltcC9uZXdzLzIwMTkvU0JPUk5JS19ET0tMQURPVl8zLXlfTU5QS19GUFAucGRmJmxyPTIxMyZtaW1lPXBkZiZsMTBuPXJ1JnNpZ249OTJlMmZhZjAzODgzODQzZDQ2YmRhZjk0YmE3N2JhM2Uma2V5bm89MCZub3N3PTEifQ%3D%3D&amp;lang=ru')} >
            3. Функциональные продукты питания: научные основы разработки, производства и потребления</Text>
        <Text style={styles.sourceText}
            onPress={() => 
            Linking.openURL('https://docs.google.com/viewerng/viewer?url=https://eee-science.ru/wp-content/uploads/2021/05/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82-%D0%94%D0%B8%D0%B5%D1%82%D0%B0-%D0%B8-%D0%B5%D0%B5-%D0%BF%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8.docx&hl=en')} >
            4. Рациональное питание - закон здорового функционирования организма</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: RFValue(17, height),
        lineHeight: hp(2.4),
        color: colors.black,
        fontFamily: 'SF-Pro-Medium',
        textAlign: 'center',
    },
    sourceText: {
        textDecorationLine: 'underline',
        fontSize: RFValue(17, height),
        lineHeight: hp(3),
        color: colors.black,
        fontFamily: 'SF-Pro-Regular',
        textAlign: 'left',
    }
})