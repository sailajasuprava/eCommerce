import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";
import axios from "../lib/axios";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    async function fetchCartItems() {
      if (!auth) return;
      try {
        setIsLoading(true);
        const res = await axios.get(`/carts/${auth?._id}`);
        setCart(res.data.data.cartItems);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCartItems();
  }, [auth?._id]);

  const addToCart = async (product) => {
    try {
      const payload = {
        user: auth._id,
        cartItems: [
          {
            productId: product._id,
            quantity: product.quantity || 1,
            selectedSize: product.selectedSize,
            selectedColor: product.selectedColor,
          },
        ],
      };
      const res = await axios.post(`/carts`, payload);
      setCart(res.data.data.cartItems);
      toast.success("Item added to cart");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const updateQuantity = async (
    _id,
    selectedSize,
    selectedColor,
    quantity,
    currentSizeStock
  ) => {
    try {
      if (quantity > currentSizeStock) {
        toast.error(`Only ${currentSizeStock} in stock`);
        return;
      }
      const payload = {
        user: auth._id,
        cartItems: [
          {
            productId: _id,
            quantity,
            selectedSize,
            selectedColor,
          },
        ],
      };

      const res = await axios.post(`/carts`, payload);
      setCart(res.data.data.cartItems);
      toast.success("Item updated");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const removeFromCart = async (_id, selectedSize, selectedColor) => {
    try {
      const payload = {
        productId: _id,
        selectedSize,
        selectedColor,
      };
      const res = await axios.patch(`/carts/${auth._id}`, payload);
      setCart(res.data.data.cartItems);
      toast.success("Item removed from cart");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const getTotalItems = () => {
    if (cart) {
      return cart.reduce((total, item) => total + (item.quantity || 0), 0);
    }
  };

  const getCartTotal = () =>
    cart.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return total + price * quantity;
    }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        getTotalItems,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
