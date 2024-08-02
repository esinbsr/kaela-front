import axios from "axios";
import { API_URL } from "./serverRequest";

export const GET_COMMENT_SUCCESS = 'GET_COMMENT_SUCCESS';
export const GET_COMMENT_ERROR = 'GET_COMMENT_ERROR';

export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';

export const getComment = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}getComment`);
            const message = response.data.message;

            if (response.data.success) {
                dispatch({
                    type: GET_COMMENT_SUCCESS,
                    payload: response.data.comment,
                    message: message
                })
            } else {
                throw new Error(message);
            }
        } catch(error) {
            dispatch({
                type: GET_COMMENT_ERROR,
                payload: error.response.data.message || "No message returned"
            })
        }
    }
}
export const addComment = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}addComment`, formData); 
            const message = response.data.message;

            if (response.data.success) {
                dispatch({
                    type: ADD_COMMENT_SUCCESS,
                    payload: response.data.comment,
                    message: message
                });
            } else {
                throw new Error(message);
            }
        } catch(error) {
            dispatch({
                type: ADD_COMMENT_ERROR,
                payload: error.response?.data?.message || "No message returned"
            });
        }
    }
}
