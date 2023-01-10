import { useEffect, useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ( { children } ) => {
    const [cart, setCart] = useState([]);

    return (
        <ShoppingCartContext.Provider value={{
            cart, setCart
        }}>
            {children}
            {console.log('ShoppingCartProvider, cart : ', cart)}
        </ShoppingCartContext.Provider>
    )
};

export const useShoppingCart = () => useContext(ShoppingCartContext)




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