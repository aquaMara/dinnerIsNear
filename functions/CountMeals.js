export const countMeals = (numberOfMeals, calorieIntake) => {

    let caloriesForEachMeal = parseInt(calorieIntake / 6, 10);
    // console.log(' countMeals caloriesForEachMeal ', caloriesForEachMeal);
    let mealsArray = [{id: 1, name: 'Завтрак', calories: caloriesForEachMeal, visible: true},
                    {id: 2, name: 'Обед', calories: caloriesForEachMeal, visible: true},
                    {id: 3, name: 'Ужин', calories: caloriesForEachMeal, visible: true},
                    {id: 4, name: 'Перекус', calories: caloriesForEachMeal, visible: true},
                    {id: 5, name: 'Перекус', calories: caloriesForEachMeal, visible: true},
                    {id: 6, name: 'Перекус', calories: caloriesForEachMeal, visible: true}];
    switch (numberOfMeals) {
        case 1: 
            mealsArray = [{id: 1, name: 'Завтрак', calories: calorieIntake, visible: true}];
            break;
        case 2: 
            caloriesForEachMeal = parseInt(calorieIntake / 2, 10);
            mealsArray = [{id: 1, name: 'Завтрак', calories: caloriesForEachMeal, visible: true},
                        {id: 2, name: 'Обед', calories: caloriesForEachMeal, visible: true}];
            break;
        case 3: 
            caloriesForEachMeal = parseInt(calorieIntake / 3, 10);
            mealsArray = [{id: 1, name: 'Завтрак', calories: caloriesForEachMeal, visible: true},
                        {id: 2, name: 'Обед', calories: caloriesForEachMeal, visible: true},
                        {id: 3, name: 'Ужин', calories: caloriesForEachMeal, visible: true}];
            break;
        case 4: 
            caloriesForEachMeal = parseInt(calorieIntake / 4, 10);
            mealsArray = [{id: 1, name: 'Завтрак', calories: caloriesForEachMeal, visible: false},
                        {id: 2, name: 'Обед', calories: caloriesForEachMeal, visible: true},
                        {id: 3, name: 'Ужин', calories: caloriesForEachMeal, visible: true},
                        {id: 4, name: 'Перекус', calories: caloriesForEachMeal, visible: true}];
            break;
        case 5: 
            caloriesForEachMeal = parseInt(calorieIntake / 5, 10);
            mealsArray = [{id: 1, name: 'Завтрак', calories: caloriesForEachMeal, visible: true},
                        {id: 2, name: 'Обед', calories: caloriesForEachMeal, visible: true},
                        {id: 3, name: 'Ужин', calories: caloriesForEachMeal, visible: true},
                        {id: 4, name: 'Перекус', calories: caloriesForEachMeal, visible: true},
                        {id: 5, name: 'Перекус', calories: caloriesForEachMeal, visible: true}];
            break;
        case 6: 
            caloriesForEachMeal = parseInt(calorieIntake / 6, 10);
            mealsArray = [{id: 1, name: 'Завтрак', calories: caloriesForEachMeal, visible: true},
                        {id: 2, name: 'Обед', calories: caloriesForEachMeal, visible: true},
                        {id: 3, name: 'Ужин', calories: caloriesForEachMeal, visible: true},
                        {id: 4, name: 'Перекус', calories: caloriesForEachMeal, visible: true},
                        {id: 5, name: 'Перекус', calories: caloriesForEachMeal, visible: true},
                        {id: 6, name: 'Перекус', calories: caloriesForEachMeal, visible: true}];
            break;
        default: 
            mealsArray = [{id: 1, name: 'Завтрак', calories: caloriesForEachMeal, visible: true},
                        {id: 2, name: 'Обед', calories: caloriesForEachMeal, visible: true},
                        {id: 3, name: 'Ужин', calories: caloriesForEachMeal, visible: true},
                        {id: 4, name: 'Перекус', calories: caloriesForEachMeal, visible: true},
                        {id: 5, name: 'Перекус', calories: caloriesForEachMeal, visible: true},
                        {id: 6, name: 'Перекус', calories: caloriesForEachMeal, visible: true}];
            break;
    }
    //console.log(' countMeals mealsArray ', mealsArray)

    return mealsArray;
}
