import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import axios from "../lib/axios";

function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();

  async function Logout() {
    setIsLoading(true);
    try {
      const res = await axios.get("/auth/logout");
      toast.success(res.data.message);
      localStorage.removeItem("eCommerceUser");
      setAuth(null);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  return { isLoading, Logout };
}

export default useLogout;
