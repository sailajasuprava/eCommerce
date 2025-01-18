import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../lib/axios";

const initialState = {
  prodname: "",
  description: "",
  price: "",
  category: "",
  image: "",
};

function useCreateProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [newProduct, setNewProduct] = useState(initialState);

  function handleFormData(e) {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("/products", newProduct);
      toast.success(res.data.message);
      setNewProduct(initialState);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };

      reader.readAsDataURL(file); // base64
    }
  }
  return {
    newProduct,
    isLoading,
    handleFormData,
    handleImageChange,
    handleSubmit,
  };
}

export default useCreateProductForm;
