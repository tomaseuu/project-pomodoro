import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp"; 
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found. Ensure there is a <div id='root'> in your index.html.");
} else {
  const root = ReactDOMClient.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <MyApp />
    </React.StrictMode>
  );
}


