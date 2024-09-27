import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from '../actions/userAction';

// État initial
const initialState = {
  role: localStorage.getItem('role'),
  user_id: localStorage.getItem('user_id'),
  username: localStorage.getItem('username'),
  token: localStorage.getItem('token'),
  message: '',
  error: '',
  success: false,
};

// Reducer pour l'état utilisateur
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // Cas de succès de connexion
    case LOGIN_SUCCESS:
      return {
        ...state,
        role: action.payload.role,
        user_id: action.payload.user_id,
        username: action.payload.username,
        token: action.payload.token,
        message: action.message,
        error: '',
        success: false,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        success: true,
        message: action.message,
        error: '',
      };

    // Cas de succès de déconnexion
    case LOGOUT_SUCCESS:
      return {
        ...state,
        role: null,
        user_id: null,
        username: null,
        token: null,
        message: '',
        error: '',
        success: false,
      };

    // Gestion des erreurs de connexion et déconnexion
    case LOGIN_ERROR:
    case LOGOUT_ERROR:
    case SIGNUP_ERROR:
      return {
        ...state,
        error: action.payload,
        message: '',
        success: false,
      };

    default:
      return state;
  }
};

export default userReducer;
