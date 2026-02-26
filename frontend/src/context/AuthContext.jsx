import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [user, setUser] = useState(localStorage.getItem("username"));

  const login = (username) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    setIsAuthenticated(true);
    setUser(username);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Petit hook personnalisé pour utiliser le contexte facilement
export const useAuth = () => useContext(AuthContext);