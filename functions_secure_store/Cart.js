
export const countCaloriesInCart = (cart, mealId) => {
    var cartCalories = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].mealId == mealId) {
            cartCalories += (cart[i].dishCalories * cart[i].amount)
        }
    }
    return cartCalories;
}

export const countProteinInCart = (cart, mealId) => {
    var cartProtein = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].mealId == mealId) {
            cartProtein += (cart[i].dishProtein * cart[i].amount)
        }
    }
    return cartProtein;
}

export const countFatsInCart = (cart, mealId) => {
    var cartFats = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].mealId == mealId) {
            cartFats += (cart[i].dishFats * cart[i].amount)
        }
    }
    return cartFats;
}

export const countCarbohydratesInCart = (cart, mealId) => {
    var cartCarbohydrates = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].mealId == mealId) {
            cartCarbohydrates += (cart[i].dishCarbohydrates * cart[i].amount)
        }
    }
    return cartCarbohydrates;
}
