import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import PrivateRoute from "./components/PrivateRoute";
import "./index.css";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { store } from "./store";
import { getCSRFToken } from "./utils/axiosInstance";

getCSRFToken()
  .then(
    createRoot(document.getElementById("root")).render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <App />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    )
  )
  .catch((error) => {
    console.error("Error initializing application:", error);
    alert("Failed to initialize application. Please try again later.");
  });
