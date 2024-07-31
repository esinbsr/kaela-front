import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from "../actions/userAction";


// Lorsque l'application démarre, elle lit les valeurs stockées dans le localStorage pour initialiser l'état
const initialState = {
  role: localStorage.getItem("role"), // Initialiser à partir du localStorage
  user_id: localStorage.getItem("user_id"),
  token: localStorage.getItem("token"),
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case LOGIN_SUCCESS:
      return {
        ...state,
        role: action.payload.role,
        user_id: action.payload.user_id,
        token: action.payload.token,
        error: "",
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        role: null,
        user_id: null,
        token: null,
        error: "",
      };

    case LOGIN_ERROR:
    case LOGOUT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
