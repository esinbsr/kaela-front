import {
  CONTACT_SUCCESS,
  CONTACT_ERROR
} from "../actions/contactAction";

const initialState = {
  message: "",
  error: "",
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_SUCCESS:
      return {
        ...state,
        message: action.message,
        error: "",
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
        message: "",
      };
    default:
      return state;
  }
};

export default contactReducer;
