"use client";
import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextProps {
  accessToken: string | null;
  setToken: (token: string | null) => void;
  updateToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setToken] = useState<string | null>(null);

  const updateToken = (token: string | null) => {
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ accessToken, setToken, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
