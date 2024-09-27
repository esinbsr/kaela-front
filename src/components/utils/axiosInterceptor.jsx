// import axios from 'axios';

// // Interceptor pour ajouter automatiquement le token d'authentification à toutes les requêtes
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log("En-têtes envoyés avec la requête:", config.headers);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
