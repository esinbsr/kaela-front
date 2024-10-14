import apiClient from "../api/apiClient";



// Types d'actions
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

// Action pour la connexion d'un utilisateur
export const loginUser = (formData) => {
  return async (dispatch) => {
    try {

      const response = await apiClient.post('login', formData);
      const { success, token, role, user_id, username, message } = response.data;

      if (success) {
        // Stockage des informations dans localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('username', username);

        // Dispatch de l'action LOGIN_SUCCESS avec les données utilisateur
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { role, user_id, username, token },
          message: message,
        });
      } else {
        throw new Error(message);
      }
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response?.data?.message || error.message || "Erreur de connexion",
      });
    }
  };
};

// Action pour l'inscription d'un utilisateur
export const addUser = (formData) => {
  return async (dispatch) => {
    try {
      // Envoi de la requête POST via apiClient
      const response = await apiClient.post('signup', formData);
      const { success, message } = response.data;

      if (success) {
        // Dispatch de l'action SIGNUP_SUCCESS si l'inscription est réussie
        dispatch({
          type: SIGNUP_SUCCESS,
          message: message,
        });
      } else {
        throw new Error(message);
      }
    } catch (error) {
      dispatch({
        type: SIGNUP_ERROR,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    try {
      // Supprimer les informations utilisateur dans localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user_id');
      localStorage.removeItem('username');

      // Dispatch de l'action LOGOUT_SUCCESS
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_ERROR, payload: error.message });
    }
  };
};