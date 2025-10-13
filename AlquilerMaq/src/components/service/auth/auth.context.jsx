import { createContext, useState } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const userValueString = localStorage.getItem("AlquilerMaq-user");
  const tokenValue = localStorage.getItem("AlquilerMaq-token");
  const userValue = userValueString ? JSON.parse(userValueString) : null;

  const [user, setUser] = useState(userValue);
  const [token, setToken] = useState(tokenValue);

  const handleLoginUser = (userData) => {
    localStorage.setItem("AlquilerMaq-token", userData.token);
    localStorage.setItem("AlquilerMaq-user", JSON.stringify(userData.user));
    setUser(userData.user);
    setToken(userData.token);
  };

  const handleLogoutUser = () => {
    localStorage.removeItem("AlquilerMaq-token");
    localStorage.removeItem("AlquilerMaq-user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, token, handleLoginUser, handleLogoutUser }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
