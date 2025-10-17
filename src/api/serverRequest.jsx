// URL de base du serveur pour les requêtes API / Base server URL for API requests
// Priorité à la variable d'environnement Vite (VITE_API_URL), sinon fallback local
export const API_URL =
  import.meta?.env?.VITE_API_URL || 'http://localhost:8888/travail-perso/kaela-couture/';