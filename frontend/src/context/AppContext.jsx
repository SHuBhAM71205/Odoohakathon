import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AppContext = createContext();

// AppProvider Component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);        // { id, name }
  const [token, setToken] = useState(null);      // JWT
  const [isLoggedIn, setIsLoggedIn] = useState(false); // true/false

  // Load from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // Login function
  const login = ({ id, name, token }) => {
    const userData = { id, name };
    setUser(userData);
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AppContext.Provider
      value={{
        user,         // { id, name }
        token,        // JWT
        isLoggedIn,   // true/false
        login,        // login({ id, name, token })
        logout,       // logout()
        setUser,
        setToken,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => useContext(AppContext);
