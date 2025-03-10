import { createContext, useState } from "react";
import { item_list, menu_list } from "../../assets/data";
import { product, productcategory } from "../../assets/b_to_c_data";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartitem, setCartitem] = useState({});

  const addToCart = (itemId, quantity, totalPrice) => {
    setCartitem((prev) => ({
      ...prev,
      [itemId]: {
        quantity: (prev[itemId]?.quantity || 0) + quantity,
        totalPrice: (prev[itemId]?.totalPrice || 0) + totalPrice,
      },
    }));
  };

  const removeFromcart = (itemId) => {
    setCartitem((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[itemId];
      return updatedCart;
    });
  };

  const contextValue = {
    item_list,
    menu_list,
    product,
    productcategory,
    addToCart,
    removeFromcart,
    cartitem,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;