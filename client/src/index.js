import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import store from "./app/store";
import { Provider } from "react-redux";

//config for axios here:
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

axios.defaults.baseURL =
  process.env.REACT_ENV_BACKEND_URL || "http://13.250.98.203";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded"; //content type when you submit what to send ? [datatype of FormData]

axios.defaults.withCredentials = true; //required when publishing website
//end config

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
