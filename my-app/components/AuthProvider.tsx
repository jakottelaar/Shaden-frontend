"use client";
import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextProps {
  accessToken: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ accessToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.error("useAuth must be used within an AuthProvider");
    return { accessToken: null, setToken: () => {} };
  }

  return context;
};

export { AuthProvider, useAuth };
