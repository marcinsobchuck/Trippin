import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ReactQueryProvider } from "./context/QueryClientProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "src/i18n";

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
  document.getElementById("root")
);
