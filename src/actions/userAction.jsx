import axios from 'axios';
import { API_URL } from './serverRequest';

// Définition des constantes pour les types d'actions
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const TOKEN_VERIFY_SUCCESS = 'TOKEN_VERIFY_SUCCESS';
export const TOKEN_VERIFY_ERROR = 'TOKEN_VERIFY_ERROR';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const RESET_MESSAGES = 'RESET_MESSAGES';

// Action pour la connexion d'un utilisateur
export const loginUser = (formData) => {
  return async (dispatch) => {
    try {
      // Envoi d'une requête POST pour la connexion
      const response = await axios.post(`${API_URL}login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const message = response.data.message;

      // Vérification du succès de la réponse
      if (response.data.success) {
        // Stockage des informations utilisateur dans localStorage
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('token', response.data.token);

        // Dispatch de l'action LOGIN_SUCCESS avec les données
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            role: response.data.role,
            user_id: response.data.user_id,
            username: response.data.username,
            token: response.data.token,
          },
          message: message,
        });
      } else {
        throw new Error(response.data.message); // En cas d'échec, une exception est levée
      }
    } catch (error) {
      // Dispatch de l'action LOGIN_ERROR en cas d'erreur
      dispatch({
        type: LOGIN_ERROR,
        payload:
          error.response?.data?.message || error.message || 'No message returned',
      });
    }
  };
};

// Action pour l'inscription d'un utilisateur
export const addUser = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}signup`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        dispatch({
          type: SIGNUP_SUCCESS,
          message: response.data.message, // Utiliser le message du serveur
        });
      } else {
        dispatch({
          type: SIGNUP_ERROR,
          payload: response.data.message, // Utiliser le message d'erreur du serveur
        });
      }
    } catch (error) {
      dispatch({
        type: SIGNUP_ERROR,
        payload:
          error.response?.data?.message || error.message || 'An error occurred',
      });
    }
  };
};


// Action pour la vérification du token
export const verifyToken = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}verifyToken`, { token }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        dispatch({
          type: TOKEN_VERIFY_SUCCESS,
          payload: {
            token: response.data.token,
            user_id: response.data.user_id,
            username: response.data.username,
          },
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch({
        type: TOKEN_VERIFY_ERROR,
        payload:
          error.response?.data?.message ||
          error.message ||
          'No message returned',
      });
    }
  };
};

// Action pour la déconnexion d'un utilisateur
export const logoutUser = () => {
  return (dispatch) => {
    try {
      // Suppression des informations utilisateur dans localStorage
      localStorage.removeItem('role');
      localStorage.removeItem('user_id');
      localStorage.removeItem('username');
      localStorage.removeItem('token');

      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_ERROR, payload: error.message });
    }
  };
};

// L'action resetMessages est utilisée pour que l'interface utilisateur ne montre plus les messages d'erreur ou de succès des opérations précédentes, ce qui est utile lorsque l'utilisateur réessaie une action après un échec ou après un succès
export const resetMessages = () => ({
  type: RESET_MESSAGES,
});
