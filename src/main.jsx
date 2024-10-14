import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "./assets/styles/index.scss";
import { Provider } from 'react-redux';
import store from './store.jsx';
import { HelmetProvider } from 'react-helmet-async';  // Import du HelmetProvider
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrapping the App component with Provider to make the Redux store available to all components */}
    <Provider store={store}>
      {/* Wrapping the App component with HelmetProvider to manage head elements */}
      <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
