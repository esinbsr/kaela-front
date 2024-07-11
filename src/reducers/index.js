import { combineReducers } from "redux";
import informationReducer from "./informationReducer";

export default combineReducers({
    information: informationReducer
})