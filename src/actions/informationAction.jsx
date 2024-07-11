import axios from 'axios';

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

const API_URL = 'http://localhost/travail-perso/kaela-couture/';

export const getInformation = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}adminInformation`);
            dispatch({
                type: GET_INFORMATION_SUCCESS,
                payload: response.data.information,
                message: response.data.message, 
            });
        } catch (error) {
            dispatch({
                type: GET_INFORMATION_ERROR,
                payload: error.message,
            });
        }
    };
};

export const addInformation = (information) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}adminAddInformation`, information, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            dispatch({
                type: ADD_INFORMATION_SUCCESS,
                payload: response.data.information,
                message: response.data.message,  // Ajout du message
            });
        } catch (error) {
            dispatch({
                type: ADD_INFORMATION_ERROR,
                payload: error.message,
            });
        }
    };
};

export const fetchSingleInformation = (informationId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}getInformation/${informationId}`);
            dispatch({
                type: FETCH_SINGLE_INFORMATION_SUCCESS,
                payload: response.data.information,
                message: response.data.message, 
            });
        } catch (error) {
            dispatch({
                type: FETCH_SINGLE_INFORMATION_ERROR,
                payload: error.message,
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
            dispatch({
                type: UPDATE_INFORMATION_SUCCESS,
                payload: response.data.information,
                message: response.data.message,
            });
        } catch (error) {
            dispatch({
                type: UPDATE_INFORMATION_ERROR,
                payload: error.message,
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
            dispatch({
                type: DELETE_INFORMATION_SUCCESS,
                payload: informationId,
                message: response.data.message, 
            });
        } catch (error) {
            dispatch({
                type: DELETE_INFORMATION_ERROR,
                payload: error.message,
            });
        }
    };
};
