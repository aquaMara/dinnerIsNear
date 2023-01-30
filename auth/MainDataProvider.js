import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createContext } from "react";
import { useContext } from "react";
import firebase from "firebase/compat";

export const mainContext = createContext();

export const MainDataProvider = ( { children } ) => {
    const [caloriesCount, setCaloriesCount] = useState(null);
    const [proteinCount, setProteinCount] = useState(null);
    const [fatsCount, setFatsCount] = useState(null);
    const [carbohydratesCount, setCarbohydratesCount] = useState(null);
    const [mealsNumber, setMealsNumber] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
            console.log('Auth Provider, user : ', currentUser)
        });
    }, []);

    return (
        <AuthContext.Provider value={{
            currentUser,
            currentUserData, setCurrentUserData
        }}>
            {children}
            {console.log('Auth Provider, USER : ', currentUser, ' USER DATA : ', currentUserData)}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(mainContext)




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