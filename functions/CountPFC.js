export const countPFC = (aim, calorieIntake) => {

    console.log(aim)
    let proteinDouble, fatsDouble, carbohydratesDouble;
    if (aim === 'maintainWeight') {
        proteinDouble = 0.3 * calorieIntake;
        fatsDouble = 0.3 * calorieIntake;
        carbohydratesDouble = 0.4 * calorieIntake;
    }
    if (aim === 'loseWeight') {
        proteinDouble = 0.4 * calorieIntake;
        fatsDouble = 0.25 * calorieIntake;
        carbohydratesDouble = 0.35 * calorieIntake;
    }
    if (aim === 'gainWeight') {
        proteinDouble = 0.35 * calorieIntake;
        fatsDouble = 0.2 * calorieIntake;
        carbohydratesDouble = 0.45 * calorieIntake;
    }
    const protein = parseInt(proteinDouble, 10);
    const fats = parseInt(fatsDouble, 10);
    const carbohydrates = parseInt(carbohydratesDouble, 10);
    return {protein, fats, carbohydrates};
}
