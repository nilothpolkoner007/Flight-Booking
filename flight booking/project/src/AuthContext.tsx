import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';

// ✅ Base URL for Backend API
const BASE_URL = 'http://localhost:5000/api/auth';

// ✅ Define User Type
interface User {
  id: string;
  email: string;
  role: string;
}

// ✅ Define Auth Context Type
interface AuthContextType {
  user: User | null;
  login: (formData: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// ✅ Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Auth Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // 🔹 Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${BASE_URL}/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          setUser(res.data);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error('Auto-login failed:', error.response?.data?.message || error.message);
          logout();
        });
    }
  }, []);

  // 🔹 Login Function
  const login = async (formData: { email: string; password: string }) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, formData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (err: any) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      setIsAuthenticated(false);
    }
  };

  // 🔹 Logout Function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook to use Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
