import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);       
  const [token, setToken] = useState(null);     
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);


  const login = ({ id, name, token }) => {
    const userData = { id, name };
    setUser(userData);
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

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
        token,       
        isLoggedIn,   
        login,        
        logout,       
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
