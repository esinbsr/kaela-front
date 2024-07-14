import { combineReducers } from 'redux';
import informationReducer from './informationReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
    information: informationReducer,
    product: productReducer,
});

export default rootReducer;