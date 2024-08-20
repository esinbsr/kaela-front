import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Creating the Redux store using configureStore from Redux Toolkit
const store = configureStore({
    reducer: rootReducer, // Combining all reducers into a single root reducer
    devTools: true, // Enabling Redux DevTools for better debugging in development
});

export default store;