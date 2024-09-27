import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
    GET_CATEGORY_BY_ID_SUCCESS,
    GET_CATEGORY_BY_ID_ERROR,
    ADD_CATEGORIES_SUCCESS,
    ADD_CATEGORIES_ERROR,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_ERROR,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
} from "../actions/categoryAction";

const initialState = {
    category: [],
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

        case GET_CATEGORY_BY_ID_SUCCESS:
            return {
                ...state,
                categoryById: action.payload,
                message: action.message,
                error: '',
            };

        case ADD_CATEGORIES_SUCCESS:
            return {
                ...state,
                category: [...state.category, action.payload],  
                message: action.message,
                error: ''
            };

        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                category: state.category.map((category) =>
                    category.id === action.payload.id ? action.payload : category
                ),
                message: action.message,
                error: '',
            };

            case DELETE_CATEGORY_SUCCESS:
                return {
                    ...state,
                    category: state.category.filter(
                        (category) => category.id !== action.payload
                    ),
                    message: action.message,
                    error: '',
                };

        case GET_CATEGORIES_ERROR:
        case GET_CATEGORY_BY_ID_ERROR:
        case ADD_CATEGORIES_ERROR:
        case UPDATE_CATEGORY_ERROR:
        case DELETE_CATEGORY_ERROR:
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
