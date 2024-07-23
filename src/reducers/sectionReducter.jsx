import { GET_SECTION_ERROR, GET_SECTION_SUCCESS } from "../actions/sectionAction"

const initialState = {
    section: [],
    message: '',
    error: ''
}

const sectionReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SECTION_SUCCESS:
            return {
                ...state,
                section: action.payload,
                message: action.message,
                error: ''
            }
        case GET_SECTION_ERROR:
            return {
                ...state,
                message: "",
                error: action.payload
            }
            default:
                return state;
    }
}

export default sectionReducer;