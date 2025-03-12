import { createContext, useState } from "react";
import { item_list, menu_list } from "../../assets/data";
import { product, productcategory } from "../../assets/b_to_c_data";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartitem, setCartitem] = useState({});

  // ✅ Add to Cart Function (Fixed Type Handling)
  const addToCart = (itemId, quantity = 1, price = 0) => {
    if (!itemId || quantity <= 0 || price <= 0) return;

    setCartitem((prev) => {
      const currentQuantity = prev[itemId]?.quantity || 0;
      const currentTotalPrice = prev[itemId]?.totalPrice || 0;

      return {
        ...prev,
        [itemId]: {
          quantity: currentQuantity + quantity,
          totalPrice: currentTotalPrice + quantity * price,
        },
      };
    });
  };

  // ✅ Remove from Cart Function
  const removeFromcart = (itemId) => {
    setCartitem((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[itemId];
      return updatedCart;
    });
  };

  const contextValue = {
    item_list: item_list || [], // Ensure fallback if undefined
    menu_list: menu_list || [],
    product: product || [],
    productcategory: productcategory || [],
    addToCart,
    removeFromcart,
    cartitem,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
