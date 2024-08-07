import axios from "axios";
import { API_URL } from "./serverRequest";

export const GET_COMMENT_SUCCESS = 'GET_COMMENT_SUCCESS';
export const GET_COMMENT_ERROR = 'GET_COMMENT_ERROR';

export const GET_COMMENT_BY_ID_SUCCESS = 'GET_COMMENT_BY_ID_SUCCESS';
export const GET_COMMENT_BY_ID_ERROR = 'GET_COMMENT_BY_ID_ERROR';

export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';

export const getComment = (productDetailId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}getCommentsByProduct/${productDetailId}`);
            const message = response.data.message;

            if (response.data.success) {
                dispatch({
                    type: GET_COMMENT_SUCCESS,
                    payload: response.data.comments,
                    message: message
                });
            } else {
                throw new Error(message);
            }
        } catch (error) {
            dispatch({
                type: GET_COMMENT_ERROR,
                payload: error.response?.data?.message || "Failed to fetch comments. Please try again."
            });
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
        } catch (error) {
            dispatch({
                type: ADD_COMMENT_ERROR,
                payload: error.response?.data?.message || "Failed to add comment. Please try again."
            });
        }
    }
}

export const getCommentById = (commentId) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${API_URL}getCommentById/${commentId}`);
        dispatch({
          type: GET_COMMENT_BY_ID_SUCCESS,
          payload: response.data.comment,
          message: response.data.message
        })
      } catch (error) {
        dispatch({
          type: GET_COMMENT_BY_ID_ERROR,
          payload: error.message,
        });
      }
    }
}
