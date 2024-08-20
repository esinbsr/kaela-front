import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./assets/styles/index.scss"
import { Provider } from 'react-redux' // Importing the Provider component from react-redux to connect Redux with React
import store from './store.jsx'

// Rendering the root component of the React app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrapping the App component with Provider to make the Redux store available to all components */}
    <Provider store={store}>
      <App /> {/* Rendering the main App component */}
    </Provider>
  </React.StrictMode>,
);
