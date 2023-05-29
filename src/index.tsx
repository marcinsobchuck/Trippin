import React from 'react';

import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';

import i18n from 'src/i18n';

import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ReactQueryProvider } from './ReactQueryProvider';

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <ReactQueryProvider>
          <App />
        </ReactQueryProvider>
      </AuthProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
