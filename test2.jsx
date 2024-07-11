import axios from "axios";

export const ADD_INFORMATION_SUCCESS = "ADD_INFORMATION_SUCCESS";
export const ADD_INFORMATION_ERROR = "ADD_INFORMATION_ERROR";
export const GET_INFORMATION_SUCCESS = "GET_INFORMATION_SUCCESS";
export const GET_INFORMATION_ERROR = "GET_INFORMATION_ERROR";
export const UPDATE_INFORMATION_SUCCESS = "UPDATE_INFORMATION_SUCCESS";
export const UPDATE_INFORMATION_ERROR = "UPDATE_INFORMATION_ERROR";
export const FETCH_SINGLE_INFORMATION_SUCCESS = "FETCH_SINGLE_INFORMATION_SUCCESS";
export const FETCH_SINGLE_INFORMATION_ERROR = "FETCH_SINGLE_INFORMATION_ERROR";
export const DELETE_INFORMATION_SUCCESS = "DELETE_INFORMATION_SUCCESS";
export const DELETE_INFORMATION_ERROR = "DELETE_INFORMATION_ERROR";

export const getInformation = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost/travail-perso/kaela-couture/adminInformation");
            const message = response.data.message || "No message returned";

            if (response.data.success) {
                dispatch({
                    type: GET_INFORMATION_SUCCESS,
                    payload: { information: response.data.information, message },
                });
            } else {
                dispatch({ type: GET_INFORMATION_ERROR, payload: message });
            }
        } catch (error) {
            console.error("Error fetching information:", error);
            dispatch({ type: GET_INFORMATION_ERROR, payload: "Network error" });
        }
    };
};

export const addInformation = (information) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost/travail-perso/kaela-couture/adminAddInformation", information, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const message = response.data.message || "No message returned";

            if (response.data.success) {
                dispatch({
                    type: ADD_INFORMATION_SUCCESS,
                    payload: { information: response.data.information, message },
                });
            } else {
                dispatch({ type: ADD_INFORMATION_ERROR, payload: message });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            dispatch({ type: ADD_INFORMATION_ERROR, payload: "Network error" });
        }
    };
};

export const fetchSingleInformation = (informationId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost/travail-perso/kaela-couture/getInformation/${informationId}`);
            const message = response.data.message || "No message returned";
            if (response.data.success) {
                dispatch({
                    type: FETCH_SINGLE_INFORMATION_SUCCESS,
                    payload: { information: response.data.information, message },
                });
            } else {
                dispatch({ type: FETCH_SINGLE_INFORMATION_ERROR, payload: message });
            }
        } catch (error) {
            console.error("Error fetching information:", error);
            dispatch({ type: FETCH_SINGLE_INFORMATION_ERROR, payload: "Network error" });
        }
    };
};

export const updateInformation = (information) => {
    return async (dispatch) => {
        console.log("Dispatching updateInformation with:", information);
        try {
            const response = await axios.post("http://localhost/travail-perso/kaela-couture/updateInformation", information, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const message = response.data.message || "No message returned";
            if (response.data.success) {
                if (response.data.information && response.data.information.id) {
                    dispatch({
                        type: UPDATE_INFORMATION_SUCCESS,
                        payload: { information: response.data.information, message },
                    });
                } else {
                    console.error("Error updating information: No information returned");
                    dispatch({ type: UPDATE_INFORMATION_ERROR, payload: "No information returned" });
                }
            } else {
                dispatch({ type: UPDATE_INFORMATION_ERROR, payload: message });
            }
        } catch (error) {
            console.error("Error updating information:", error);
            dispatch({ type: UPDATE_INFORMATION_ERROR, payload: "Network error" });
        }
    };
};


export const deleteInformation = (informationId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost/travail-perso/kaela-couture/deleteInformation", { informationId });
            const message = response.data.message || "No message returned";
            if (response.data.success) {
                dispatch({
                    type: DELETE_INFORMATION_SUCCESS,
                    payload: { informationId, message },
                });
            } else {
                dispatch({ type: DELETE_INFORMATION_ERROR, payload: message });
            }
        } catch (error) {
            console.error("Error deleting information:", error);
            dispatch({ type: DELETE_INFORMATION_ERROR, payload: "Network error" });
        }
    };
};
