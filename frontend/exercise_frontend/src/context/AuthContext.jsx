// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('access_token') && !!localStorage.getItem('refresh_token')
  );

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (accessToken && refreshToken) {
        try {
          // Access token hala geçerli mi kontrol et
          await axios.get('http://localhost:8000/api/token/verify/', {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
          setIsLoggedIn(true);
        } catch (error) {
          if (error.response?.status === 401) {
            // Access token geçersizse refresh token ile yeni access token al
            try {
              const response = await axios.post('http://localhost:8000/api/token/refresh/', {
                refresh: refreshToken
              });
              const newAccessToken = response.data.access;
              localStorage.setItem('access_token', newAccessToken);
              setIsLoggedIn(true);
            } catch (refreshError) {
              // Refresh token da geçersizse çıkış yap
              logout();
            }
          }
        }
      } else {
        logout();
      }
    };

    checkAuth();
  }, []);

  const login = (accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);