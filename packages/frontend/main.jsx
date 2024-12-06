import ReactDOMClient from "react-dom/client";
import "./main.css";

function MyApp() {
  return <div></div>;
}
const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(<MyApp />);
