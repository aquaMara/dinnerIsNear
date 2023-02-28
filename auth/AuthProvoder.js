import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createContext } from "react";
import { useContext } from "react";
import firebase from "firebase/compat";

export const AuthContext = createContext();

export const AuthProvider = ( { children } ) => {
    // id, name + Stable values for every day
    const [currentUser, setCurrentUser] = useState(null);
    const [name, setName] = useState('');

    // Stable values for every day
    const [calories, setCalories] = useState(null);
    const [protein, setProtein] = useState(null);
    const [fats, setFats] = useState(null);
    const [carbohydrates, setCarbohydrates] = useState(null);
    const [mealsCount, setMealsCount] = useState(null);

    // Eaten this day
    const [todayEatenMeals, setTodayEatenMeals] = useState([]);
    
    const [caloriesCount, setCaloriesCount] = useState([]);
    const [proteinCount, setProteinCount] = useState([]);
    const [fatsCount, setFatsCount] = useState([]);
    const [carbohydratesCount, setCarbohydratesCount] = useState([]);
    const [mealsNumber, setMealsNumber] = useState(null);

    const [loading, setLoading] = useState(true);

    // For Cart
    const [currentUserMeals, setCurrentUserMeals] = useState([]);

    /*
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
            // get all data from firebases
            console.log('Auth Provider, user : ', currentUser)
        });
    }, []);
    */

    return (
        <AuthContext.Provider value={{
            currentUser,
            mealsCount, setMealsCount,
            name, setName,

            calories, setCalories,
            protein, setProtein,
            fats, setFats,
            carbohydrates, setCarbohydrates,

            caloriesCount, setCaloriesCount,
            proteinCount, setProteinCount,
            fatsCount, setFatsCount,
            carbohydratesCount, setCarbohydratesCount,
            mealsNumber, setMealsNumber,
            currentUserMeals, setCurrentUserMeals

        }}>
            {children}

            
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext)

/*
{console.log('Auth Provider, mealsCount : ', mealsCount)}
            {console.log('Auth Provider, caloriesCount : ', caloriesCount)}
            {console.log('Auth Provider, proteinCount : ', proteinCount)}
            {console.log('Auth Provider, fatsCount : ', fatsCount)}
            {console.log('Auth Provider, carbohydratesCount : ', carbohydratesCount)}
            {console.log('Auth Provider, mealsNumber : ', mealsNumber)}
            {console.log('Auth Provider, currentUserMeals : ', currentUserMeals)}
*/


    //if (!currentUser) {
      //  return null;
    //}

    /*
if (loading) {
        return (
            <View>
                <Text>Loading</Text>    
            </View>)
    }
    */