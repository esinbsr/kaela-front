// reducers/productReducer.js
import {
    GET_PRODUCT_SUCCESS,
    GET_INFORMATION_ERROR,
    GET_PRODUCT_BY_ID_SUCCESS,
    GET_PRODUCT_BY_ID_ERROR,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_ERROR,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR
} from '../actions/productAction';

const initialState = {
    products: [],
    categories: [],
    productById: null,
    message: '',
    error: ''
};

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                products: action.payload,
                message: action.message,
                error: ''
            };
        case GET_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                productById: action.payload,
                message: action.message,
                error: ''
            };
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                message: action.message,
                error: ''
            };
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [...state.products, action.payload],
                message: action.message,
                error: ''
            };
        case ADD_PRODUCT_ERROR:
        case GET_PRODUCT_BY_ID_ERROR:
        case GET_CATEGORIES_ERROR:
        case GET_INFORMATION_ERROR:
        case UPDATE_PRODUCT_ERROR:
        case DELETE_PRODUCT_ERROR:
            return {
                ...state,
                message: '',
                error: action.payload
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload?.id ? action.payload : product
                ),
                message: action.message,
                error: ''
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload),
                message: 'Product deleted successfully',
                error: ''
            };
        default:
            return state;
    }
};

export default productReducer;
