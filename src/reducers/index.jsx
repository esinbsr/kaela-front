import { combineReducers } from 'redux';
import informationReducer from './informationReducer';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import sectionReducer from './sectionReducter';
import socialNetworkReducer from './socialNetworkReducer';
import userReducer from './userReducer';
import commentReducer from './commentReducer';

const rootReducer = combineReducers({
    information: informationReducer,
    product: productReducer,
    category: categoryReducer,
    section: sectionReducer,
    socialNetwork: socialNetworkReducer,
    user: userReducer,
    comment: commentReducer,
});

export default rootReducer;