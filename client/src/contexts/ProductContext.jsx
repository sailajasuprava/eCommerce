import { createContext, useContext, useState } from "react";
// import toast from "react-hot-toast";
// import axios from "../lib/axios";

const ProductContext = createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("context used outside of provider");
  return context;
}

export default ProductProvider;