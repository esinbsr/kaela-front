import axios from "axios";

export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR';

const API_URL = 'http://localhost:8888/travail-perso/kaela-couture/';

export const getProductCategories = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}getProductCategory`);
            const message = response.data.message || "No message returned";

            if (response.data.success) {
                dispatch({
                    type: GET_CATEGORIES_SUCCESS,
                    payload: response.data.categorie,
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
