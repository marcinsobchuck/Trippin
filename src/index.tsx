import React from 'react';

import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import i18n from 'src/i18n';

import App from './App';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
