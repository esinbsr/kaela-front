import axios from "axios";

export const ADD_INFORMATION_SUCCESS = "ADD_INFORMATION_SUCCESS";
export const ADD_INFORMATION_ERROR = "ADD_INFORMATION_ERROR";

export const addInformation = (information) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(
                "http://localhost/travail-perso/kaela-couture/adminAddInformation",
                information,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const message = res.data.message || "No message returned";
            dispatch({ type: ADD_INFORMATION_SUCCESS, payload: { information: res.data, message } });
        } catch (error) {
            console.error("Error submitting form:", error);
            dispatch({ type: ADD_INFORMATION_ERROR, payload: "Error submitting form" });
        }
    };
};
