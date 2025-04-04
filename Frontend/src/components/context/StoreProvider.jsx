import { createContext, useState, useEffect } from "react";
import { item_list, menu_list } from "../../assets/data";
import { product, productcategory } from "../../assets/b_to_c_data";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartitem, setCartitem] = useState(() => {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Save cart to localStorage when it updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartitem));
  }, [cartitem]);

  const addToCart = (itemId, quantity = 1, price = 0) => {
    if (!itemId || quantity <= 0 || price <= 0) return;

    setCartitem((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId]) {
        updatedCart[itemId].quantity += quantity;
        updatedCart[itemId].totalPrice = (
          parseFloat(updatedCart[itemId].totalPrice) +
          quantity * price
        ).toFixed(2);
      } else {
        updatedCart[itemId] = {
          quantity,
          totalPrice: (quantity * price).toFixed(2),
        };
      }
      return updatedCart;
    });
  };

  const removeFromcart = (itemId) => {
    setCartitem((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[itemId];
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartitem({});
    localStorage.removeItem("cart");
  };

  const contextValue = {
    item_list: item_list || [],
    menu_list: menu_list || [],
    product: product || [],
    productcategory: productcategory || [],
    b2c_items: productcategory || [],
    addToCart,
    removeFromcart,
    clearCart,
    cartitem,
    isLoading,
    selectedOption,
    setSelectedOption,
    setIsLoading,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
