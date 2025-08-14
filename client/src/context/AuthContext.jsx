import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("udsEcommerce")) || null
  );
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("udsEcommerce"))?.role === "admin"
  );

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
