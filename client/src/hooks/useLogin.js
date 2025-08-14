import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { useAuth } from "../context/AuthContext";

const initialState = {
  email: "",
  password: "",
};

function useLogin() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth, setIsAdmin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post("/auth/login", formData);
      toast.success(res.data.message);
      localStorage.setItem("udsEcommerce", JSON.stringify(res.data.data));
      setAuth(res.data.data);
      setIsAdmin(res.data.data.role === "admin");
      setFormData(initialState);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { formData, isLoading, handleChange, handleSubmit };
}

export default useLogin;
