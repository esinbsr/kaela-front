import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";

// Création d'un contexte pout partager des informations d'authentification dans toute l'application
// Create a context for sharing authentication information throughout the application
export const AuthContext = createContext();

// Auth provider est un composant de fournisseur de contexte, il encapsule les composants enfants (children) et leur fournit l'accès aux données d'authentification et aux fonctions login et logout
// Auth provider is a context provider component. It encapsulates child components and provides them with access to authentication data and login and logout functions.
export const AuthProvider = ({ children }) => {
  const decodeToken = (token) => {
    // Vérifie si le token est fourni, si le token est présent, la fonction continue, sinon elle passe à la dernière ligne et retourne des valeurs null.
    if (token) {
      // Bloc pour attraper des erreurs potentielles, comme un token invalide ou malformé.
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
        // Si le décodage échoue, la fonction retourne un objet avec toutes les valeurs définies à null donc ca signifie que l'utilisateur n'est pas authentifié ou son token est invalide.
        // If decoding fails, the function returns an object with all the values set to null, which means that the user is not authenticated or his token is invalid.
        return {
          token: null,
          userId: null,
          role: null,
          username: null,
          email: null,
        };
      }
    }
    // Si le token n'est pas fourni (condition if non satisfaite), la fonction retourne aussi un objet avec toutes les valeurs à null
    // If the token is not supplied (if condition not met), the function also returns an object with all the values set to null.
    return {
      token: null,
      userId: null,
      role: null,
      username: null,
      email: null,
    };
  };

  // Cette fonction sert à initialiser l'état d'authentification de l'application quand elle est chargée pour la première fois
  // This function is used to initialise the authentication state of the application when it is loaded for the first time
  const initialAuth = () => {
    const token = localStorage.getItem("token");
    return decodeToken(token);
  };

  const [auth, setAuth] = useState(initialAuth);

  // Fonction utilisée pour authentifier un utilisateur
  // Function used to authenticate a user
  const login = ({ token }) => {
    localStorage.setItem("token", token);
    const decodedAuth = decodeToken(token);
    setAuth(decodedAuth);
  };

  // Fonction utilisée pour déconnecter un utilisateur
  // Function used to disconnect a user
  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      token: null,
      userId: null,
      role: null,
      username: null,
      email: null,
    });
  };

  // Partage l'état d'authentification et les fonctions de connexion/déconnexion avec tous les composants enfants
  // Shares authentication status and login/logout functions with all child components
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

  // Tous les composants qui utilisent le contexte AuthContext via useContext(AuthContext) peuvent accéder à auth, login, et logout.
  // All components that use the AuthContext context via useContext(AuthContext) can access auth, login and logout.
};
