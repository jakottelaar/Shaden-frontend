"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  login as apiLogin,
  logout as apiLogout,
  refresh as apiRefresh,
} from "../auth-service";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    try {
      await apiLogin(email, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    apiLogout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
