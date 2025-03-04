import { createContext } from "react";
import { item_list, menu_list }from "../../assets/data"
export const StoreContext=createContext(null);

 const StoreContextProvider=(props)=>{
  const contextValue = { 
     item_list ,
     menu_list
  }; 
  return(
    <StoreContext.Provider value={contextValue}>
    {props.children}
  </StoreContext.Provider>
  )
}
export default StoreContextProvider;
