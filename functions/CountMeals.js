export const countMeals = (numberOfMeals, calorieIntake) => {

    let caloriesForEachMeal = parseInt(calorieIntake / 6, 10);
    // console.log(' countMeals caloriesForEachMeal ', caloriesForEachMeal);
    let mealsArray = [{id: 0, name: 'Завтрак', calories: caloriesForEachMeal, visible: false},
                    {id: 1, name: 'Обед', calories: caloriesForEachMeal, visible: false},
                    {id: 2, name: 'Ужин', calories: caloriesForEachMeal, visible: false},
                    {id: 3, name: 'Перекус', calories: caloriesForEachMeal, visible: false},
                    {id: 4, name: 'Перекус', calories: caloriesForEachMeal, visible: false},
                    {id: 5, name: 'Перекус', calories: caloriesForEachMeal, visible: false}];
    switch (numberOfMeals) {
        case 1: 
            mealsArray = [{id: 0, name: 'Завтрак', calories: calorieIntake, visible: false}];
            break;
        case 2: 
            caloriesForEachMeal = parseInt(calorieIntake / 2, 10);
            mealsArray = [{id: 0, name: 'Завтрак', calories: caloriesForEachMeal, visible: false},
                        {id: 1, name: 'Обед', calories: caloriesForEachMeal, visible: false}];
            break;
        case 3: 
            caloriesForEachMeal = parseInt(calorieIntake / 3, 10);
            mealsArray = [{id: 0, name: 'Завтрак', calories: caloriesForEachMeal, visible: false},
                        {id: 1, name: 'Обед', calories: caloriesForEachMeal, visible: false},
                        {id: 2, name: 'Ужин', calories: caloriesForEachMeal, visible: false}];
            break;
        case 4: 
            caloriesForEachMeal = parseInt(calorieIntake / 4, 10);
            mealsArray = [{id: 0, name: 'Завтрак', calories: caloriesForEachMeal, visible: false},
                        {id: 1, name: 'Обед', calories: caloriesForEachMeal, visible: false},
                        {id: 2, name: 'Ужин', calories: caloriesForEachMeal, visible: false},
                        {id: 3, name: 'Перекус', calories: caloriesForEachMeal, visible: false}];
            break;
        case 5: 
            caloriesForEachMeal = parseInt(calorieIntake / 5, 10);
            mealsArray = [{id: 0, name: 'Завтрак', calories: caloriesForEachMeal, visible: false},
                        {id: 1, name: 'Обед', calories: caloriesForEachMeal, visible: false},
                        {id: 2, name: 'Ужин', calories: caloriesForEachMeal, visible: false},
                        {id: 3, name: 'Перекус', calories: caloriesForEachMeal, visible: false},
                        {id: 4, name: 'Перекус', calories: caloriesForEachMeal, visible: false}];
            break;
        case 6: 
            caloriesForEachMeal = parseInt(calorieIntake / 6, 10);
            mealsArray = [{id: 0, name: 'Завтрак', calories: caloriesForEachMeal, visible: false},
                        {id: 1, name: 'Обед', calories: caloriesForEachMeal, visible: false},
                        {id: 2, name: 'Ужин', calories: caloriesForEachMeal, visible: false},
                        {id: 3, name: 'Перекус', calories: caloriesForEachMeal, visible: false},
                        {id: 4, name: 'Перекус', calories: caloriesForEachMeal, visible: false},
                        {id: 5, name: 'Перекус', calories: caloriesForEachMeal, visible: false}];
            break;
        default: 
            mealsArray = [{id: 0, name: 'Завтрак', calories: caloriesForEachMeal, visible: false},
                        {id: 1, name: 'Обед', calories: caloriesForEachMeal, visible: false},
                        {id: 2, name: 'Ужин', calories: caloriesForEachMeal, visible: false},
                        {id: 3, name: 'Перекус', calories: caloriesForEachMeal, visible: false},
                        {id: 4, name: 'Перекус', calories: caloriesForEachMeal, visible: false},
                        {id: 5, name: 'Перекус', calories: caloriesForEachMeal, visible: false}];
            break;
    }
    //console.log(' countMeals mealsArray ', mealsArray)

    return mealsArray;
}
