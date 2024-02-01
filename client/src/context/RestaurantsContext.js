import React, {createContext, useState} from "react";

export const RestaurantsContext= createContext();

export const RestaurantsContextProvider= (props)=>{
    const {restaurants, setRestaurants}= useState([]);
const {selectedRestaurant, setSlectedRestaurant}= useState(null);
const addRestaurants = (restaurant)=>{
 setRestaurants([...restaurants, restaurant]);
};
 return (
    <RestaurantsContext.Provider>
        {props.children}
    </RestaurantsContext.Provider>
 )
};

