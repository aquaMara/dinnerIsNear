export const countCalories = (gender, weight, height, dateOfBirthFormatted, lifestyle, aim, weightChange) => {

    let today = new Date();
    // 2022/12/07
    let dateOfBirth = new Date(dateOfBirthFormatted);
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    var m = today.getMonth() - dateOfBirth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) 
    {
        age--;
    }

    let lifestyleCoefficient = 1.375;
    switch (lifestyle) {
        case 'minimum': lifestyleCoefficient = 1.2; break;
        case 'little':  lifestyleCoefficient = 1.375; break;
        case 'average':  lifestyleCoefficient = 1.46; break;
        case 'higherThanAverage':  lifestyleCoefficient = 1.55; break;
        case 'increased':  lifestyleCoefficient = 1.64; break;
        case 'high': lifestyleCoefficient = 1.72; break;
        case 'veryHigh': lifestyleCoefficient = 1.9; break;
        default: lifestyleCoefficient = 1.375; break;
    }
    let calorieIntakeBeforeWeightControl = 0;
    if (gender === 'female') {
        calorieIntakeBeforeWeightControl = (10 * weight + 6.25 * height - 5 * age - 161) * lifestyleCoefficient;
    } else {
        calorieIntakeBeforeWeightControl = (10 * weight + 6.25 * height - 5 * age + 5) * lifestyleCoefficient;
    }

    let weightChangeCoefficient = 1;    // maintainWeight
    if (aim === 'loseWeight') {
        switch (weightChange) {
            case 'smooth': weightChangeCoefficient = 0.9; break;
            case 'regular':  weightChangeCoefficient = 0.8; break;
            case 'active':  weightChangeCoefficient = 0.7; break;
            default: weightChangeCoefficient = 0.9; break;
        }
    } else if (aim === 'gainWeight') {
        switch (weightChange) {
            case 'smooth': weightChangeCoefficient = 1.1; break;
            case 'regular':  weightChangeCoefficient = 1.2; break;
            case 'active':  weightChangeCoefficient = 1.3; break;
            default: weightChangeCoefficient = 1.1; break;
        }
    }

    const calorieIntakeDouble = calorieIntakeBeforeWeightControl * weightChangeCoefficient;
    const calorieIntake = parseInt(calorieIntakeDouble, 10)
    return calorieIntake;
}
