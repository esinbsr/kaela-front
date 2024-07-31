import axios from 'axios';
import { API_URL } from './serverRequest';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const loginUser = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('token', response.data.token);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            role: response.data.role,
            user_id: response.data.user_id,
            token: response.data.token,
          },
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload:
          error.response?.data?.message ||
          error.message ||
          'No message returned',
      });
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    try {
      localStorage.removeItem('role');
      localStorage.removeItem('user_id');
      localStorage.removeItem('token');

      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_ERROR, payload: error.message });
    }
  };
};
