import React from "react";
import ReactDOM from "react-dom/client";
import GlobalTheme from "./globalTheme";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "normalize.css";
import "./index.css";
import { UserProvider } from "./contexts/user/userContext";
import { PropertyProvider } from "./contexts/properties/propertiesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalTheme>
        <UserProvider>
          <PropertyProvider>
            <App />
          </PropertyProvider>
        </UserProvider>
      </GlobalTheme>
    </BrowserRouter>
  </React.StrictMode>
);
