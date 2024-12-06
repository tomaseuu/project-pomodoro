import React from "react";
import ReactDOM from "react-dom/client";
import MyApp from "./MyApp"; 
import "./index.css"; 

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found. Check if <div id='root'> exists in index.html.");
} else {
  console.log("Root element found:", rootElement);
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <MyApp />
    </React.StrictMode>
  );
}
