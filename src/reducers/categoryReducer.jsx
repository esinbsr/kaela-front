import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_BY_ID_SUCCESS,
    ADD_CATEGORIES_SUCCESS,
    ADD_CATEGORIES_ERROR,
} from "../actions/categoryAction";

const initialState = {
    category: [],  // Initialisé comme un tableau
    categoryById: null,
    message: '',
    error: ''
};

const categoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                category: action.payload,
                message: action.message,
                error: ''
            };
        case GET_CATEGORIES_BY_ID_SUCCESS:
            return {
                ...state,
                categoryById: action.payload,
                message: action.message,
                error: ''
            };
        case ADD_CATEGORIES_SUCCESS:
            return {
                ...state,
                category: [...state.category, action.payload],  
                message: action.message,
                error: ''
            };
        case ADD_CATEGORIES_ERROR:
        case GET_CATEGORIES_ERROR:
            return {
                ...state,
                message: "",
                error: action.payload,
            };
        default:
            return state;
    }
};

export default categoryReducer;
