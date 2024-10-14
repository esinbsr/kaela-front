import axios from "axios";
import { API_URL } from "../api/serverRequest";


export const GET_SECTION_SUCCESS = 'GET_SECTION_SUCCESS';
export const GET_SECTION_ERROR = 'GET_SECTION_ERROR';

export const getSection = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}getSection`);
            const message = response.data.message;

            if (response.data.success) {
                dispatch({
                    type: GET_SECTION_SUCCESS,
                    payload: response.data.section,
                    message: message
                })
            } else {
                throw new Error(message);
            }
        } catch(error) {
            dispatch({
                type: GET_SECTION_ERROR,
                payload: error.response?.data?.message || error.message || "No message returned",
            })
        }
    }
}