import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.hydrateRoot(
  document.getElementById("app")!, // the same element ID as used for SSR
  <App />
);
