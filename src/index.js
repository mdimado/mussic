import React from "react";
import ReactDOM from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import main from "./redux/main";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode classname="nopx">
    <BrowserRouter classname="nopx">
      <Provider store={main} classname="nopx">
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={1500}       
        closeOnClick        
        pauseOnHover={false} 
      />
      
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
