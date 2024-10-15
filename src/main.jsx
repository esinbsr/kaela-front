import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "./assets/styles/index.scss";
import { HelmetProvider } from 'react-helmet-async';  // Import du HelmetProvider
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    {/* Wrapping the App component with Provider to make the Redux store available to all components */}

      {/* Wrapping the App component with HelmetProvider to manage head elements */}
      <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
      </QueryClientProvider>

    </AuthProvider>
  </React.StrictMode>,
);
