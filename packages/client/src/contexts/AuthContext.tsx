import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storedToken, setStoredToken] = useLocalStorage<string | null>("token", null);
  const [token, setToken] = useState<string | null>(storedToken);
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedToken);

  useEffect(() => {
    setToken(storedToken);
    setIsAuthenticated(!!storedToken);
  }, [storedToken]);

  const login = (newToken: string) => {
    setToken(newToken);
    setIsAuthenticated(true);
    setStoredToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setStoredToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
