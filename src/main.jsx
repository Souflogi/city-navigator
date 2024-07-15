import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "leaflet/dist/leaflet.css";

import { CitiesProvider } from "./shared/contexts/CitiesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CitiesProvider>
      <App />
    </CitiesProvider>
  </React.StrictMode>
);
