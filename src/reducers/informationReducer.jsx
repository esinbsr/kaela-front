import { ADD_INFORMATION_SUCCESS, ADD_INFORMATION_ERROR } from "../actions/informationAction";

const initialState = {
    information: [],
    message: "",
    error: ""
};

export default function informationReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_INFORMATION_SUCCESS:
            return {
                ...state,
                information: [...state.information, action.payload.information],
                message: action.payload.message,
                error: ""
            };
        case ADD_INFORMATION_ERROR:
            return {
                ...state,
                message: "",
                error: action.payload
            };
        default:
            return state;
    }
}
