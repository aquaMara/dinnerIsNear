const saveEatenToFirebase = (totalCalories, totalProtein, totalFats, totalCarbohydrates, mealId) => {
    const date = new Date();
    const userId = 'LAS3S528apZ5J627SwEfsIn6oke2';
    firebase.firestore().collection('today').doc(userId)
        .get().then((snapshot) => {
            if (snapshot.exists) {
                firebase.firestore().collection('today').doc(userId).get().then((snapshot) => {
                    const array = Object.values(snapshot.data());
                    var newData = {};
                    for (let i = 0; i < array.length; i++) {
                        newData[array[i].mealId] = array[i];
                    }
                    newData[mealId] = {totalCalories, totalProtein, totalFats, totalCarbohydrates, mealId, 'date': new Date()};
                    firebase.firestore().collection('today').doc(userId)
                        .set(newData)
                        .then('saveEatenToFirebase added item')
                        .catch(err => console.log('saveEatenToFirebase 1', err));
                })
            } else {
                firebase.firestore().collection('today').doc(userId)
                    .set({[mealId]: {totalCalories, totalProtein, totalFats, totalCarbohydrates, mealId} })
                    .catch(err => console.log('saveEatenToFirebase 2', err));
            }
        });
        getEatenFromFirebase();
}

const getEatenFromFirebase = () => {
    const userId = 'LAS3S528apZ5J627SwEfsIn6oke2';
    let caloriesFb = 0, proteinFb = 0, fatsFb = 0, carbohydratesFb = 0;
    firebase.firestore().collection('today').doc(userId)
        .get().then((snapshot) => {
            if (snapshot.exists) {
                let arrayOfMealsWithCalories = Object.values(snapshot.data())
                console.log(arrayOfMealsWithCalories.length)
                for (let i = 0; i < arrayOfMealsWithCalories.length; i++) {
                    caloriesFb += arrayOfMealsWithCalories[i].totalCalories;
                    proteinFb += arrayOfMealsWithCalories[i].totalProtein;
                    fatsFb += arrayOfMealsWithCalories[i].totalFats;
                    carbohydratesFb += arrayOfMealsWithCalories[i].totalCarbohydrates;
                }
                //setCaloriesCount(caloriesFb);
                /*
                setCaloriesCountFb(() => caloriesFb);
                setProteinCountFb(proteinFb);
                setFatsCountFb(fatsFb);
                setCarbohydratesCountFb(carbohydratesFb);
                console.log(caloriesFb, caloriesCountFb, proteinCountFb, fatsCountFb, caloriesCountFb, 'hhh');
                console.log(caloriesFb, proteinFb, fatsFb, carbohydratesFb)
                */
            }
        });
}