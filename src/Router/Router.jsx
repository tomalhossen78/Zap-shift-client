import { Component } from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/register";
import BeaRider from "../Pages/Rider/BeaRider";
import PrivateRoutes from "./PrivateRoutes";
import Sendparcel from "../Pages/SendParcel/Sendparcel";

export const Router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    hydrateFallbackElement: <p className="animate-spin">Loading....</p>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "beArider",
        element: (
          <PrivateRoutes>
            <BeaRider />
          </PrivateRoutes>
        ),
      },
      {
        path: "send-parcel",
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
        element: (
          <PrivateRoutes>
            <Sendparcel />
          </PrivateRoutes>
        ),
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
