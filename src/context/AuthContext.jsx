import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const getInitialAuth = () => ({
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    role: localStorage.getItem("role") || null,
  });

  const [auth, setAuth] = useState(getInitialAuth);

  // Fonction pour gérer la connexion de l'utilisateur
  const login = ({ token, userId, role }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);

    // Mettre à jour l'état du contexte
    setAuth({ token, userId, role });
  };

  // Fonction pour gérer la déconnexion de l'utilisateur
  const logout = () => {
    // Supprimer les informations du Local Storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    // Réinitialiser l'état du contexte
    setAuth({ token: null, userId: null, role: null });

  };

  // Valeurs et fonctions exposées par le contexte
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
