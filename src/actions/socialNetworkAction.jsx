import apiClient from "./api/apiClient";

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
            const response = await apiClient.get("getSocialNetwork");
            const message = response.data.message;

            if (response.data.success) {
            dispatch({
                type: GET_SOCIAL_NETWORK_SUCCESS,
                payload: response.data.socialNetwork,
                message: message,
            });
        } else {
            throw new Error(message);
        }
        } catch (error) {
            dispatch({
                type: GET_SOCIAL_NETWORK_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned"
            });
        }
    };
};

export const getSocialNetworkById = (socialNetworkId) => {
    return async (dispatch) => {
        try {
            const response = await apiClient.get(`getSocialNetworkById/${socialNetworkId}`);
            const message = response.data.message;

            if (response.data.success) {
            dispatch({
                type: GET_SOCIAL_NETWORK_BY_ID_SUCCESS,
                payload: response.data.socialNetwork,
                message: message,
            });
        } else {
            throw new Error(message);
        }
        } catch (error) {
            dispatch({
                type: GET_SOCIAL_NETWORK_BY_ID_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned",
            });
        }
    };
};

export const addSocialNetwork = (socialNetwork) => {
    return async (dispatch) => {
        try {
            const response = await apiClient.post(`addSocialNetwork`, socialNetwork);
            const message = response.data.message;
            if (response.data.success  && response.data.socialNetwork) {
                dispatch({
                    type: ADD_SOCIAL_NETWORK_SUCCESS,
                    payload: response.data.socialNetwork,
                    message: message,
                });
            }
            else {
                throw new Error(message);
              }
        } catch (error) {
            dispatch({
                type: ADD_SOCIAL_NETWORK_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned"
            });
        }
    };
};

export const updateSocialNetwork = (socialNetwork) => {
    return async (dispatch) => {
        try {
            const response = await apiClient.post(`updateSocialNetwork`, socialNetwork);
            const message = response.data.message;
            if (response.data.success) {
            dispatch({
                type: UPDATE_SOCIAL_NETWORK_SUCCESS,
                payload: response.data.socialNetwork,
                message: message,
            });
        } else {
            throw new Error(message);
        }
        } catch (error) {
            dispatch({
                type: UPDATE_SOCIAL_NETWORK_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned"
            });
        }
    };
};

export const deleteSocialNetwork = (socialNetworkId) => {
    return async (dispatch) => {
        try {
            const response = await apiClient.post(`deleteSocialNetwork`, { socialNetworkId });
            const message = response.data.message; 
            if (response.data.success) {
            dispatch({
                type: DELETE_SOCIAL_NETWORK_SUCCESS,
                payload: socialNetworkId,
                message: message,
            });
        } else {
            throw new Error(message);
        }
        } catch (error) {
            dispatch({
                type: DELETE_SOCIAL_NETWORK_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned"
            });
        }
    };
};