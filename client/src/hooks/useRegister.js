import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const initialState = {
  fullname: "",
  email: "",
  phone: "",
  password: "",
  passwordConfirm: "",
};

function useRegister() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth, setIsAdmin } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleInputValidation(formData) {
    const { password, passwordConfirm } = formData;

    if (password.length < 8) {
      toast.error("Password must be of at least 8 characters.");
      return false;
    }
    if (password !== passwordConfirm) {
      toast.error("Passwords don't match.");
      return false;
    }

    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = handleInputValidation(formData);
    if (!success) return;

    try {
      setIsLoading(true);
      const res = await axios.post("/auth/signup", formData);
      toast.success(res.data.message);
      localStorage.setItem("udsEcommerce", JSON.stringify(res.data.data));
      setAuth(res.data.data);
      setIsAdmin(res.data.data.role === "admin");
      setFormData(initialState);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { formData, isLoading, handleSubmit, handleChange };
}

export default useRegister;
