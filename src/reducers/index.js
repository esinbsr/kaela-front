import { combineReducers } from 'redux';
import informationReducer from './informationReducer';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import sectionReducer from './sectionReducter';

const rootReducer = combineReducers({
    information: informationReducer,
    product: productReducer,
    category: categoryReducer,
    section: sectionReducer,
});

export default rootReducer;