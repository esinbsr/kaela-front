import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
} from "../actions/categoryAction";

const initialState = {
    categorie: [],
}

const categoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categorie: action.payload,
                message: action.message,
                error: ''
            };

        case GET_CATEGORIES_ERROR:
            return {
                ...state,
                message: "",
                error: action.payload,
            };
        default:
            return state;
    }
}

export default categoryReducer;
