import apiClient from "./api/apiClient";


// Types d'actions
export const CONTACT_SUCCESS = 'CONTACT_SUCCESS';
export const CONTACT_ERROR = 'CONTACT_ERROR';

export const contact = (formData) => {
  return async (dispatch) => {
    try {
      const response = await apiClient.post('contact', formData);
      const { success, message} = response.data;

      if (success) {
        dispatch({
          type: CONTACT_SUCCESS,
          message: message,
        });
      } else {
        throw new Error(message);
      }
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response?.data?.message || error.message
      });
    }
  }
}

