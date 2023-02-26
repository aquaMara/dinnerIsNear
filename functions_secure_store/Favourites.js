import * as SecureStore from 'expo-secure-store';

export const addToFavs = async (mealId, item) => {
    const {id, dishName, restaurantName, section, tags, dishCalories, dishProtein,
        dishFats, dishCarbohydrates, dishPath, dishPrice, description, weight} = item;
    const newItem = {id, dishName, restaurantName, section, tags, dishCalories, dishProtein,
        dishFats, dishCarbohydrates, dishPath, dishPrice, description, weight, mealId};
    // await SecureStore.deleteItemAsync('arrayOfFavourites')
    let arrayOfFavs = await SecureStore.getItemAsync('arrayOfFavourites');
    if (arrayOfFavs == null) {
        let tempArray = [];
        tempArray.push(newItem);
        await SecureStore.setItemAsync('arrayOfFavourites', JSON.stringify(tempArray));
    } else {
        let arrayOfFavourites = [];
        arrayOfFavourites = JSON.parse(arrayOfFavs);
        let elementExists = false;
        for (let i = 0; i < arrayOfFavourites.length; i++) {
            if (arrayOfFavourites[i].id == newItem.id && arrayOfFavourites[i].mealId == newItem.mealId) {
                elementExists = true;
            }
        }
        if (!elementExists) {
            arrayOfFavourites.push(newItem);
        }
        await SecureStore.setItemAsync('arrayOfFavourites', JSON.stringify(arrayOfFavourites));
    }
}

