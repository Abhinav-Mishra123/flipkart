"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await axios.get('/api/me');
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          setUser(null);  // No user found in the session
        }
      } catch (error) {
        // If the token is invalid or not available, we can avoid console.error
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401 || error.response?.status === 403) {
            // User is unauthorized or token is invalid, so just set the user to null
            setUser(null);
          } else {
            // Log unexpected errors to the console for debugging
            console.error('An unexpected error occurred:', error.response?.data || error.message);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const logout = async () => {
    try {
      await axios.get('/api/logout');
      setUser(null); // Clear the user on successful logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
