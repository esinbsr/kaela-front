import axios from "axios";
import { API_URL } from "../api/serverRequest";

// Crée une instance personnalisé de axios / Creates a custom instance of axios
const apiClient = axios.create({
  baseURL: API_URL, // Url de base / Base url
  headers: {
    "Content-Type": "application/json", // En-tête par défaut / Default header
  },
});

// Intercepteur pour ajouter automatiquement le token JWT à toutes les requêtes 
//  Interceptor to automatically add the JWT token to all requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Ne pas écraser le Content-Type si déjà défini, comme dans multipart/form-data
    // Do not overwrite Content-Type if already defined, as in multipart/form-data
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
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
