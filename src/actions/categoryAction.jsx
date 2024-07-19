import axios from "axios";
import { API_URL } from "./serverRequest";

export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR';

export const GET_CATEGORIES_BY_ID_SUCCESS = 'GET_CATEGORIES_BY_ID_SUCCESS';
export const GET_CATEGORIES_BY_ID_ERROR = 'GET_CATEGORIES_BY_ID_ERROR';

export const getProductCategories = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}getProductCategory`);
            const message = response.data.message || "No message returned";

            if (response.data.success) {
                dispatch({
                    type: GET_CATEGORIES_SUCCESS,
                    payload: response.data.category,
                    message: message
                });
            } else {
                throw new Error(message);
            }
        } catch (error) {
            dispatch({
                type: GET_CATEGORIES_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned",
            });
        }
    };
};

export const getInformationById = (categoryId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}getCategoryById/${categoryId}`);
            dispatch({
                type: GET_CATEGORIES_BY_ID_SUCCESS,
                payload: response.data.categoryById,
                message: response.data.message,
            });
        } catch (error) {
            dispatch({
                type: GET_CATEGORIES_BY_ID_ERROR,
                payload: error.message,
            });
        }
    };
};
