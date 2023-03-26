import { useEffect, useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

export const DeliveryCartContext = createContext();

export const DeliveryCartProvider = ( { children } ) => {
    const [dcart, setDcart] = useState([]);

    return (
        <DeliveryCartContext.Provider value={{
            dcart, setDcart
        }}>
            {children}
        </DeliveryCartContext.Provider>
    )
};

export const useDeliveryCart = () => useContext(DeliveryCartContext)




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