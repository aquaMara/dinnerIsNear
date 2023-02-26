
import * as SecureStore from 'expo-secure-store';

export const checkSecureStore = async () => {
    console.log( await SecureStore.getItemAsync('userId'));
    console.log( await SecureStore.getItemAsync('phoneNumber'));
    console.log(await SecureStore.getItemAsync('name'));
    console.log(await SecureStore.getItemAsync('gender'));
    console.log(await SecureStore.getItemAsync('dateOfBirth'));
    console.log(await SecureStore.getItemAsync('weight'));
    console.log(await SecureStore.getItemAsync('height'));
    console.log(await SecureStore.getItemAsync('lifestyle'));
    console.log(parseInt(await SecureStore.getItemAsync('dayCalories')));
    console.log(await SecureStore.getItemAsync('dayProtein'));
    console.log(await SecureStore.getItemAsync('dayFats'));
    console.log(await SecureStore.getItemAsync('dayCarbohydrates'));
    console.log(await SecureStore.getItemAsync('oneMealCalories'));
    console.log(await SecureStore.getItemAsync('aim'));
        console.log(await SecureStore.getItemAsync('aimRhytm'));
        console.log(await SecureStore.getItemAsync('mealAmount'));

        console.log(await SecureStore.getItemAsync('veganism'));
        console.log(await SecureStore.getItemAsync('vegetarianism' ));
        console.log(await SecureStore.getItemAsync('fish' ));
        console.log(await SecureStore.getItemAsync('meat' ));
        console.log(await SecureStore.getItemAsync('nuts' ));
        console.log(await SecureStore.getItemAsync('sugar' ));
        console.log(await SecureStore.getItemAsync('gluten' ));
        console.log(await SecureStore.getItemAsync('lactose' ));
        console.log(await SecureStore.getItemAsync('mushrooms'));
        console.log(await SecureStore.getItemAsync('steamed' ));

        console.log(await SecureStore.getItemAsync('boiled' ));
        console.log(await SecureStore.getItemAsync('stewed' ));
        console.log(await SecureStore.getItemAsync('fried' ));
        console.log(await SecureStore.getItemAsync('deepFried' ));
        console.log(await SecureStore.getItemAsync('roasted' ));
        console.log(await SecureStore.getItemAsync('dried' ));
  }