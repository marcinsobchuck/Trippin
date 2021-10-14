import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ReactQueryProvider } from "./context/QueryClientProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ReactQueryProvider>
        <App />
      </ReactQueryProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
