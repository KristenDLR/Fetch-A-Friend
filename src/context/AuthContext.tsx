import React, { createContext, useContext, useState } from "react";
import { login } from "../services/authService";

interface AuthContextProps {
  isAuthenticated: boolean;
  loginUser: (name: string, email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginUser = async (name: string, email: string) => {
    await login(name, email);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth failed");
  }
  return context;
};
