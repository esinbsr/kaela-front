import { combineReducers } from 'redux';
import informationReducer from './informationReducer';

const rootReducer = combineReducers({
    information: informationReducer,
});

export default rootReducer;
