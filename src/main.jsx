import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "./Router/Router.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./Context/AuthContext/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
