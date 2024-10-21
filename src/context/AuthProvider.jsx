
import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const decodeToken = (token) => {
    if (token) {
      try {
        const decoded = jwtDecode(token); 
        return {
          token,
          userId: decoded.user_id,
          role: decoded.role,
          username: decoded.username,
          email: decoded.email,
        };
      } catch {
        return { token: null, userId: null, role: null, username: null, email: null };
      }
    }
    return { token: null, userId: null, role: null, username: null, email: null };
  };

  const initialAuth = () => {
    const token = localStorage.getItem("token");
    return decodeToken(token);
  };

  const [auth, setAuth] = useState(initialAuth);

  const login = ({ token }) => {
    localStorage.setItem("token", token);
    const decodedAuth = decodeToken(token);
    setAuth(decodedAuth);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, userId: null, role: null, username: null, email: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

