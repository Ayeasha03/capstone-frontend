import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(); // Creates the authentication context

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); 
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Load user from localStorage
    }
  }, []);

  const login = (userData) => {
    setUser(userData); 
    localStorage.setItem('user', JSON.stringify(userData)); // Save user to localStorage
    navigate('/dashboard'); // Redirect after login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
    navigate('/'); // Redirect to homepage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context easily
export const useAuthContext = () => useContext(AuthContext);
