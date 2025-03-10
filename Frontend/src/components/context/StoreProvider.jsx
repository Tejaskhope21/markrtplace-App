import { createContext, useState } from "react";
import { item_list, menu_list }from "../../assets/data"
import { product,productcategory } from "../../assets/b_to_c_data";
export const StoreContext=createContext(null);

// const [addTocard,setAddTocard]=useState()

 const StoreContextProvider=(props)=>{
  const contextValue = { 
     item_list ,
     menu_list,
     product,
     productcategory

  }; 
  return(
    <StoreContext.Provider value={contextValue}>
    {props.children}
  </StoreContext.Provider>
  )
}
export default StoreContextProvider;
