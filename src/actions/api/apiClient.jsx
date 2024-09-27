import axios from "axios";
import { API_URL } from "../serverRequest";

// Avec ce fichier :
// - Toutes les requêtes utilisant apiClient sont automatiquement envoyées à l'URL de base que j'ai définis
// - L'intercepteur ajoute automatiquement un token JWT à chaque requête

// Créer une instance d'Axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter automatiquement le token JWT à toutes les requêtes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Ne pas écraser le Content-Type si déjà défini, comme dans multipart/form-data
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Fonction pour configurer l'intercepteur avec la fonction de déconnexion
export const setupInterceptors = (logout) => {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
          // Si le token est expiré, déconnecter l'utilisateur
      if (error.response && error.response.status === 401) {
        logout(); // Appel à la fonction logout passée depuis AuthContext
      }
      return Promise.reject(error);
    }
  );
};


export default apiClient;
