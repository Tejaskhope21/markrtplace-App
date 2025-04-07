import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { item_list, menu_list } from "../../assets/data";
import { product, productcategory } from "../../assets/b_to_c_data";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartitem, setCartitem] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [cartDetails, setCartDetails] = useState([]); // Holds detailed product data
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [token, setToken] = useState(null);

  // Save cart to localStorage when updated
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartitem));
  }, [cartitem]);

  // Fetch cart item details from API
  useEffect(() => {
    const fetchCartDetails = async () => {
      const itemIds = Object.keys(cartitem);
      if (itemIds.length === 0) {
        setCartDetails([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/itemsb2c", {
          params: { ids: itemIds.join(",") },
        });

        if (response.data) {
          setCartDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching cart item details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartDetails();
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
    setCartDetails([]);
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
    cartDetails, // Provides detailed product data
    isLoading,
    selectedOption,
    setSelectedOption,
    setIsLoading,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
