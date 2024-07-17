import { combineReducers } from 'redux';
import informationReducer from './informationReducer';
import productReducer from './productReducer';
// import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
    information: informationReducer,
    product: productReducer,
    // category: categoryReducer
});

export default rootReducer;