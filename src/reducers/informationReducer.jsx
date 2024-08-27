import {
    ADD_INFORMATION_SUCCESS,
    ADD_INFORMATION_ERROR,
    GET_INFORMATION_SUCCESS,
    GET_INFORMATION_ERROR,
    UPDATE_INFORMATION_SUCCESS,
    UPDATE_INFORMATION_ERROR,
    DELETE_INFORMATION_SUCCESS,
    DELETE_INFORMATION_ERROR,
    FETCH_SINGLE_INFORMATION_SUCCESS,
    FETCH_SINGLE_INFORMATION_ERROR,
    RESET_INFORMATION_MESSAGES,
} from '../actions/informationAction';

const initialState = {
    information: [], //tableau vide pour stocker les informations récupérées
    singleInformation: null,
    message: '', //chaîne vide pour stocker les messages de retour (par exemple, des messages de succès)
    error: '',
};

const informationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INFORMATION_SUCCESS:
            return {
                ...state,
                information: action.payload,
                message: action.message,
                error: '',
            };
   
        case FETCH_SINGLE_INFORMATION_SUCCESS:
            return {
                ...state,
                singleInformation: action.payload,
                message: action.message,
                error: '',
            };

        case ADD_INFORMATION_SUCCESS:
            return {
                ...state,
                information: [...state.information, action.payload],
                message: action.message,
                error: '',
            };


        case UPDATE_INFORMATION_SUCCESS:
            return {
                ...state,
                information: state.information.map((info) =>
                    info.id === action.payload.id ? action.payload : info
                ),
                message: action.message,
                error: '',
            };
            
        case DELETE_INFORMATION_SUCCESS:
            return {
                ...state,
                information: state.information.filter(
                    (info) => info.id !== action.payload
                ),
                message: action.message,
                error: '',
            };
        
            case RESET_INFORMATION_MESSAGES:
                return {
                  ...state,
                  message: "",
                  error: "",
                };
        case GET_INFORMATION_ERROR:
        case ADD_INFORMATION_ERROR:
        case FETCH_SINGLE_INFORMATION_ERROR:
        case UPDATE_INFORMATION_ERROR:
        case DELETE_INFORMATION_ERROR:
            return {
                ...state,
                message: '',
                error: action.payload,
            };
        default:
            return state;
    }
};

export default informationReducer;
