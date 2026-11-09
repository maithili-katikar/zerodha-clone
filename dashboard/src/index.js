import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import { UserProvider } from "./components/UserContext";
import { GeneralContextProvider } from "./components/GeneralContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GeneralContextProvider>
        <UserProvider>
          <Routes>
            <Route path="/*" element={<Home />} />
          </Routes>
        </UserProvider>
      </GeneralContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
