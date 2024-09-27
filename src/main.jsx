import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "./assets/styles/index.scss";
import { Provider } from 'react-redux';
import store from './store.jsx';
import { HelmetProvider } from 'react-helmet-async';  // Import du HelmetProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrapping the App component with Provider to make the Redux store available to all components */}
    <Provider store={store}>
      {/* Wrapping the App component with HelmetProvider to manage head elements */}
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
);
