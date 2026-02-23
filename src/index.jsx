import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./global.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root") ).render(
  <BrowserRouter>
  <ToastContainer />
    <App />
  </BrowserRouter>
);
