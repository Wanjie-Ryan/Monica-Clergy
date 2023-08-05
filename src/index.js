import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RegContextProvider } from "./context/RegContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RegContextProvider>
      <App />
      <ToastContainer className="toast-container"/>
    </RegContextProvider>
  </React.StrictMode>
);
