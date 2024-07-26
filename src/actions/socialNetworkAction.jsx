import axios from 'axios';
import { API_URL } from './serverRequest';

export const GET_SOCIAL_NETWORK_SUCCESS = 'GET_SOCIAL_NETWORK_SUCCESS';
export const GET_SOCIAL_NETWORK_ERROR = 'GET_SOCIAL_NETWORK_ERROR';

export const GET_SOCIAL_NETWORK_BY_ID_SUCCESS = 'GET_SOCIAL_NETWORK_BY_ID_SUCCESS';
export const GET_SOCIAL_NETWORK_BY_ID_ERROR = 'GET_SOCIAL_NETWORK_BY_ID_ERROR';

export const ADD_SOCIAL_NETWORK_SUCCESS = 'ADD_SOCIAL_NETWORK_SUCCESS';
export const ADD_SOCIAL_NETWORK_ERROR = 'ADD_SOCIAL_NETWORK_ERROR';

export const UPDATE_SOCIAL_NETWORK_SUCCESS = 'UPDATE_SOCIAL_NETWORK_SUCCESS';
export const UPDATE_SOCIAL_NETWORK_ERROR = 'UPDATE_SOCIAL_NETWORK_ERROR';

export const DELETE_SOCIAL_NETWORK_SUCCESS = 'DELETE_SOCIAL_NETWORK_SUCCESS';
export const DELETE_SOCIAL_NETWORK_ERROR = 'DELETE_SOCIAL_NETWORK_ERROR';

export const getSocialNetwork = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}getSocialNetwork`);
            dispatch({
                type: GET_SOCIAL_NETWORK_SUCCESS,
                payload: response.data.socialNetwork,
                message: response.data.message,
            });
        } catch (error) {
            dispatch({
                type: GET_SOCIAL_NETWORK_ERROR,
                payload: error.message,
            });
        }
    };
};

export const getSocialNetworkById = (socialNetworkId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}getSocialNetworkById/${socialNetworkId}`);
            dispatch({
                type: GET_SOCIAL_NETWORK_BY_ID_SUCCESS,
                payload: response.data.socialNetwork,
                message: response.data.message,
            });
        } catch (error) {
            dispatch({
                type: GET_SOCIAL_NETWORK_BY_ID_ERROR,
                payload: error.message,
            });
        }
    };
};

export const addSocialNetwork = (socialNetwork) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}addSocialNetwork`, socialNetwork, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            dispatch({
                type: ADD_SOCIAL_NETWORK_SUCCESS,
                payload: response.data.socialNetwork,
                message: response.data.message,
            });
        } catch (error) {
            dispatch({
                type: ADD_SOCIAL_NETWORK_ERROR,
                payload: error.message,
            });
        }
    };
};

export const updateSocialNetwork = (socialNetwork) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}updateSocialNetwork`, socialNetwork, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            dispatch({
                type: UPDATE_SOCIAL_NETWORK_SUCCESS,
                payload: response.data.socialNetwork,
                message: response.data.message,
            });
        } catch (error) {
            dispatch({
                type: UPDATE_SOCIAL_NETWORK_ERROR,
                payload: error.message,
            });
        }
    };
};

export const deleteSocialNetwork = (socialNetworkId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}deleteSocialNetwork`, { socialNetworkId }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            dispatch({
                type: DELETE_SOCIAL_NETWORK_SUCCESS,
                payload: socialNetworkId,
                message: response.data.message,
            });
        } catch (error) {
            dispatch({
                type: DELETE_SOCIAL_NETWORK_ERROR,
                payload: error.message,
            });
        }
    };
};
