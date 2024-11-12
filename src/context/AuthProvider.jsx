import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";

// Create a context for sharing authentication information across the application
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Function to decode the JWT token and extract user information
  const decodeToken = (token) => {
    if (token) {
      try {
        // Decode the JWT token and return the extracted user data
        const decoded = jwtDecode(token);
        return {
          token,
          userId: decoded.user_id,
          role: decoded.role,
        };
      } catch {
        // If decoding fails, return null values indicating an invalid or unauthenticated state
        return {
          token: null,
          userId: null,
          role: null,
        };
      }
    }
    // If no token is provided, return null values indicating an unauthenticated state
    return {
      token: null,
      userId: null,
      role: null,
    };
  };

  // Initializes the authentication state when the application loads for the first time
  const initialAuth = () => {
    const token = localStorage.getItem("token");
    return decodeToken(token);
  };

  // Set up the initial authentication state based on the presence of a token
  const [auth, setAuth] = useState(initialAuth);

  // Function to authenticate a user by storing the token and decoding its data
  const login = ({ token }) => {
    localStorage.setItem("token", token);
    const decodedAuth = decodeToken(token);
    setAuth(decodedAuth);
  };

  // Function to log out a user by removing the token and resetting auth state to null
  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      token: null,
      userId: null,
      role: null,
    });
  };

  // Provide the auth state and login/logout functions to child components
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// All components using AuthContext through useContext(AuthContext) will have access to auth, login, and logout.
