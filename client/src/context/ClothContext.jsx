import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

const ClothContext = createContext();

function ClothProvider({ children }) {
  const [clothes, setClothes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchAllClothes() {
      try {
        setIsLoading(true);
        const res = await axios.get("/clothes");
        setClothes(res.data.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch clothes");
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllClothes();
  }, []);

  console.log(clothes);

  return (
    <ClothContext.Provider
      value={{ clothes, setClothes, isLoading, setIsLoading }}
    >
      {children}
    </ClothContext.Provider>
  );
}

export function useCloth() {
  const context = useContext(ClothContext);
  if (!context) throw new Error("ClothContext used outside of provider.");
  return context;
}

export default ClothProvider;
