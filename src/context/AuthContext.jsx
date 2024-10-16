
import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // extraire les informations du token
  const decodeToken = (token) => {
    if (token) {
      try {
        const decoded = jwtDecode(token); // Décoder le token

        // Retourner les informations extraites du token
        return {
          token,
          userId: decoded.user_id,   // Extraire user_id
          role: decoded.role,        // Extraire le rôle
          username: decoded.username, // Extraire le nom d'utilisateur
          email: decoded.email,       // Extraire l'email
        };
      } catch (error) {
        console.error("Invalid token", error);
        return { token: null, userId: null, role: null, username: null, email: null };
      }
    }
    return { token: null, userId: null, role: null, username: null, email: null };
  };

  const getInitialAuth = () => {
    const token = localStorage.getItem("token");
    return decodeToken(token); // Décode et récupère les infos du token
  };

  const [auth, setAuth] = useState(getInitialAuth);

  // Fonction pour gérer la connexion de l'utilisateur
  const login = ({ token }) => {
    localStorage.setItem("token", token);
    
    // Décoder le token pour récupérer userId, role, username, et email
    const decodedAuth = decodeToken(token);

    // Mettre à jour l'état du contexte
    setAuth(decodedAuth);
  };

  // Fonction pour gérer la déconnexion de l'utilisateur
  const logout = () => {
    // Supprimer le token du Local Storage
    localStorage.removeItem("token");

    // Réinitialiser l'état du contexte
    setAuth({ token: null, userId: null, role: null, username: null, email: null });
  };

  // Valeurs et fonctions exposées par le contexte
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
