import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initalState = Cookies.get("jwt") || localStorage.getItem("ChatApp");
  const [authUser, setAuthUser] = useState(
    initalState ? JSON.parse(initalState) : undefined
  );

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
