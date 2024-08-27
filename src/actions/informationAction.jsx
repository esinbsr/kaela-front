import axios from 'axios';
import { API_URL } from './serverRequest';

export const ADD_INFORMATION_SUCCESS = 'ADD_INFORMATION_SUCCESS';
export const ADD_INFORMATION_ERROR = 'ADD_INFORMATION_ERROR';

export const GET_INFORMATION_SUCCESS = 'GET_INFORMATION_SUCCESS';
export const GET_INFORMATION_ERROR = 'GET_INFORMATION_ERROR';

export const UPDATE_INFORMATION_SUCCESS = 'UPDATE_INFORMATION_SUCCESS';
export const UPDATE_INFORMATION_ERROR = 'UPDATE_INFORMATION_ERROR';

export const DELETE_INFORMATION_SUCCESS = 'DELETE_INFORMATION_SUCCESS';
export const DELETE_INFORMATION_ERROR = 'DELETE_INFORMATION_ERROR';

export const FETCH_SINGLE_INFORMATION_SUCCESS = 'FETCH_SINGLE_INFORMATION_SUCCESS';
export const FETCH_SINGLE_INFORMATION_ERROR = 'FETCH_SINGLE_INFORMATION_ERROR';

export const RESET_INFORMATION_MESSAGES = 'RESET_INFORMATION_MESSAGES';

export const getInformation = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}getInformation`);
            const message = response.data.message;
            
            if (response.data.success) {
            dispatch({
                type: GET_INFORMATION_SUCCESS,
                payload: response.data.information,
                message: message, 
            });
        } else {
            throw new Error(message);
        }
        } catch (error) {
            dispatch({
                type: GET_INFORMATION_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned",
            });
        }
    };
};

export const getInformationById = (informationId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}getInformationById/${informationId}`); // ${informationId} passe l'ID spécifique de l'information que je veux récupérer du serveur. j'utilises l'ID pour déclencher l'action getInformationById lorsque le composant est monté ou lorsque l'ID change
            const message = response.data.message;

            if (response.data.success) {
            dispatch({
                type: FETCH_SINGLE_INFORMATION_SUCCESS,
                payload: response.data.information,
                message: message,
            });
        } else {
            throw new Error(message);
        }
        } catch (error) {
            dispatch({
                type: FETCH_SINGLE_INFORMATION_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned",
            });
        }
    };
};


export const addInformation = (information) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}addInformation`, information, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const message = response.data.message;

            if(response.data.success) {
                dispatch({
                    type: ADD_INFORMATION_SUCCESS,
                    payload: response.data.information,
                    message: message,
                });
            }  else {
                throw new Error(message);
              }
        } catch (error) {
            dispatch({
                type: ADD_INFORMATION_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned"
            });
        }
    };
};


export const updateInformation = (information) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}updateInformation`, information, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const message = response.data.message;
            if (response.data.success) {
            dispatch({
                type: UPDATE_INFORMATION_SUCCESS,
                payload: response.data.information,
                message: response.data.message,
            });
        } else {
            throw new Error(message);
        }
        } catch (error) {
            dispatch({
                type: UPDATE_INFORMATION_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned"
            });
        }
    };
};

export const deleteInformation = (informationId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}deleteInformation`, { informationId }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const message = response.data.message; 
            if (response.data.success) {
            dispatch({
                type: DELETE_INFORMATION_SUCCESS,
                payload: informationId,
                message: message,
            });
        } else {
            throw new Error(message);
        }
        } catch (error) {
            dispatch({
                type: DELETE_INFORMATION_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned"
            });
        }
    };
};

export const resetInformationMessages = () => ({
    type: RESET_INFORMATION_MESSAGES,
});
