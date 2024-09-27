import axios from 'axios';
import apiClient from "./api/apiClient";

export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_ERROR = 'GET_PRODUCT_ERROR';

export const GET_PRODUCT_BY_ID_SUCCESS = 'GET_PRODUCT_BY_ID_SUCCESS';
export const GET_PRODUCT_BY_ID_ERROR = 'GET_PRODUCT_BY_ID_ERROR';

export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_ERROR = 'ADD_PRODUCT_ERROR';

export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_ERROR = 'UPDATE_PRODUCT_ERROR';

export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_ERROR = 'DELETE_PRODUCT_ERROR';

import { API_URL } from "./serverRequest";


export const getProduct = () => {
    return async (dispatch) => { 
        try {
            const response = await axios.get(`${API_URL}getProduct`);
            const message = response.data.message;

            if (response.data.success) {
                dispatch({  
                    type: GET_PRODUCT_SUCCESS,
                    payload: response.data.product,
                    message: message
                });
            } else {
                throw new Error(message);
            }
        } catch (error) {
            dispatch({
                type: GET_PRODUCT_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned",
            });
        }
    };
};

export const getProductById = (productId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}getProductById/${productId}`);
            const message = response.data.message;

            if (response.data.success) {
                dispatch({
                    type: GET_PRODUCT_BY_ID_SUCCESS,
                    payload: response.data.product,
                    message: message
                });
            } else {
                throw new Error(message);
            }
        } catch (error) {
            dispatch({
                type: GET_PRODUCT_BY_ID_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned",
            });
        }
    };
};


export const addProduct = (formData) => {
    return async (dispatch) => {
        try {
            const response = await apiClient.post(`addProduct`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const message = response.data.message;

            if (response.data.success) {
                dispatch({
                    type: ADD_PRODUCT_SUCCESS,
                    payload: response.data.product,
                    message: message
                });
            } else {
                throw new Error(message);
            }
        } catch (error) {
            dispatch({
                type: ADD_PRODUCT_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned",
            });
        }
    };
};

export const updateProduct = (formData) => {
    return async (dispatch) => {
        try {
            const response = await apiClient.post(`updateProduct`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const message = response.data.message;

            if (response.data.success) {
                dispatch({
                    type: UPDATE_PRODUCT_SUCCESS,
                    payload: response.data.product,
                    message: message
                });
            } else {
                throw new Error(message);
            }
        } catch (error) {
            dispatch({
                type: UPDATE_PRODUCT_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned",
            });
        }
    };
};


export const deleteProduct = (productId) => {
    return async (dispatch) => {
        try {
            const response = await apiClient.post(`deleteProduct`, { productId });
            const message = response.data.message; 
            if (response.data.success) {
                dispatch({
                    type: DELETE_PRODUCT_SUCCESS,
                    payload: productId,
                    message: message
                });
            } else {
                throw new Error(message);
            }
        } catch (error) {
            dispatch({
                type: DELETE_PRODUCT_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned",
            });
        }
    };
};