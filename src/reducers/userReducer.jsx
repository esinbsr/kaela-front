import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  TOKEN_VERIFY_SUCCESS,
  TOKEN_VERIFY_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  RESET_MESSAGES,
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

// Reducer utilisateur
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        role: action.payload.role,
        user_id: action.payload.user_id,
        username: action.payload.username,
        token: action.payload.token,
        message: action.message, // Message de succès
        error: '', // Réinitialisation de l'erreur
        success: false, // Réinitialisation du succès de l'inscription
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        role: null,
        user_id: null,
        username: null,
        token: null,
        message: '', // Réinitialisation du message
        error: '', // Réinitialisation de l'erreur
        success: false, // Réinitialisation du succès de l'inscription
      };

  
      case SIGNUP_SUCCESS:
        return {
          ...state,
          success: true, // Indique que l'inscription a réussi
          message: action.message, // Message de succès
          error: '', // Réinitialisation de l'erreur
        };


      case TOKEN_VERIFY_SUCCESS:
        return {
          ...state,
          token: action.payload.token,
          user_id: action.payload.user_id, 
          username: action.payload.username,
          error: '', // Réinitialisation de l'erreur
          success: false, // Réinitialisation du succès de l'inscription
        };

      case RESET_MESSAGES:
        return {
          ...state,
          error: '', // Efface tout message d'erreur en le réinitialisant à une chaîne vide
          message: '', // Réinitialise le message de succès à une chaîne vide, supprimant ainsi tout message de succès affiché
          success: false, // Réinitialise le statut de succès, indiquant qu'aucune opération réussie n'est en cours
        };



    case LOGIN_ERROR:
    case LOGOUT_ERROR:
    case TOKEN_VERIFY_ERROR:
      return {
        ...state,
        error: action.payload, // Capture du message d'erreur
        message: '', // Réinitialisation du message de succès
        success: false, // Réinitialisation du succès de l'inscription
      };


    case SIGNUP_ERROR:
      return {
        ...state,
        success: false, // Réinitialisation de l'état de succès
        error: action.payload, // Capture du message d'erreur
        message: '', // Réinitialisation du message de succès
      };

    default:
      return state;
  }
};

export default userReducer;