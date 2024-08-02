import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  TOKEN_VERIFY_SUCCESS,
  TOKEN_VERIFY_ERROR,
} from '../actions/userAction';

const initialState = {
  role: localStorage.getItem('role'), // Initialiser à partir du localStorage
  user_id: localStorage.getItem('user_id'),
  username: localStorage.getItem('username'),
  token: localStorage.getItem('token'),
  error: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        role: action.payload.role,
        user_id: action.payload.user_id,
        username: action.payload.username,
        token: action.payload.token,
        error: '',
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        role: null,
        user_id: null,
        username: null,
        token: null,
        error: '',
      };

    case LOGIN_ERROR:
    case LOGOUT_ERROR:
    case TOKEN_VERIFY_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case TOKEN_VERIFY_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        error: '',
      };

    default:
      return state;
  }
};

export default userReducer;
