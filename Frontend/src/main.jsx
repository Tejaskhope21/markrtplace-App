import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css'
import StoreContextProvider from "./components/context/StoreProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
 <StoreContextProvider>
      <App />
    </StoreContextProvider>
    </BrowserRouter>
);