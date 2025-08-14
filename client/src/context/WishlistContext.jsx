import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    async function fetchWishlist() {
      if (!auth) return;
      try {
        setIsLoading(true);
        const res = await axios.get(`/wishlists/${auth?._id}`);
        setWishlist(res.data.data.items);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWishlist();
  }, [auth?._id]);

  const addToWishlist = async (product) => {
    try {
      const payload = {
        userId: auth._id,
        productId: product,
      };
      const res = await axios.post(`/wishlists`, payload);
      setWishlist(res.data.data.items);
      toast.success("Item added to wishlist");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const res = await axios.delete(`/wishlists/${auth?._id}/${productId}`);
      setWishlist(res.data.data.items);
      toast.success("Item removed from wishlist");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const getTotalWishlistItems = () => wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isLoading,
        addToWishlist,
        removeFromWishlist,
        getTotalWishlistItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("WishlistContext used outside of provider.");
  return context;
}

export default WishlistProvider;
