import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Pre-seed with traveler user so everything is instantly accessible or customizable
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('pahadivibe_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      id: 'usr-1',
      name: 'Priyanshu Singh Mahar',
      email: 'priyanshu@pahadivibe.in',
      role: 'traveler', // 'traveler' | 'vendor' | 'admin'
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      badge: 'Verified Himalayan Explorer'
    };
  });

  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('pahadivibe_user', JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('pahadivibe_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoggedIn: !!currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
