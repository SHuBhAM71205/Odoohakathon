import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);       
  const [token, setToken] = useState(null);     
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [role, setRole] = useState("user"); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedToken && storedRole) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setRole(storedRole);
      setIsLoggedIn(true);
    }
  }, []);

  const login = ({ id, name, token, role }) => {
    const userData = { id, name };
    setUser(userData);
    setToken(token);
    setRole(role);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole("user");
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AppContext.Provider
      value={{
        user,         // { id, name }
        token,
        role,
        isLoggedIn,
        login,
        logout,
        setUser,
        setToken,
        setIsLoggedIn,
        setRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


// Custom hook
export const useAppContext = () => useContext(AppContext);
