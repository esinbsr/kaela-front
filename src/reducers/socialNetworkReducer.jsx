import { ADD_SOCIAL_NETWORK_ERROR, ADD_SOCIAL_NETWORK_SUCCESS, DELETE_SOCIAL_NETWORK_ERROR, DELETE_SOCIAL_NETWORK_SUCCESS, GET_SOCIAL_NETWORK_BY_ID_ERROR, GET_SOCIAL_NETWORK_BY_ID_SUCCESS, GET_SOCIAL_NETWORK_ERROR, GET_SOCIAL_NETWORK_SUCCESS, UPDATE_SOCIAL_NETWORK_ERROR, UPDATE_SOCIAL_NETWORK_SUCCESS } from "../actions/socialNetworkAction";


const initialState = {
    socialNetwork: [], //tableau vide pour stocker les informations récupérées
    socialNetworkById: null,
    message: '', //chaîne vide pour stocker les messages de retour (par exemple, des messages de succès)
    error: '',
};

const socialNetworkReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SOCIAL_NETWORK_SUCCESS:
            return {
                ...state,
                socialNetwork: action.payload,
                message: action.message,
                error: '',
            };
   
        case GET_SOCIAL_NETWORK_BY_ID_SUCCESS:
            return {
                ...state,
                socialNetworkById: action.payload,
                message: action.message,
                error: '',
            };

        case ADD_SOCIAL_NETWORK_SUCCESS:
            return {
                ...state,
                socialNetwork: [...state.socialNetwork, action.payload],
                message: action.message,
                error: '',
            };

        case  UPDATE_SOCIAL_NETWORK_SUCCESS:
            return {
                ...state,
                socialNetwork: state.socialNetwork.map((socialNetwork) =>
                    socialNetwork.id === action.payload.id ? action.payload : socialNetwork
                ),
                message: action.message,
                error: '',
            };

        case DELETE_SOCIAL_NETWORK_SUCCESS:
            return {
                ...state,
                socialNetwork: state.socialNetwork.filter((socialNetwork) => socialNetwork.id !== action.payload),
                message: action.message,
                error: ''
            }
            
 
        case GET_SOCIAL_NETWORK_ERROR:
        case GET_SOCIAL_NETWORK_BY_ID_ERROR:
        case ADD_SOCIAL_NETWORK_ERROR:
        case UPDATE_SOCIAL_NETWORK_ERROR:
            case DELETE_SOCIAL_NETWORK_ERROR:

            return {
                ...state,
                message: '',
                error: action.payload,
            };
        default:
            return state;
    }
};

export default socialNetworkReducer;
