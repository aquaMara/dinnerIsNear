import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createContext } from "react";
import { useContext } from "react";
import firebase from "firebase/compat";

export const AuthContext = createContext();

export const AuthProvider = ( { children } ) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserData, setCurrentUserData] = useState(null);
    const [loading, setLoading] = useState(true);

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

export const useAuth = () => useContext(AuthContext)




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