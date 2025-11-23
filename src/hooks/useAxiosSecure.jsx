import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import Swal from "sweetalert2";
import { useLocation } from "react-router";
const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logout } = useAuth();
  const navigate = useLocation();
  useEffect(() => {
    // intercept request
    const reqIntercepters = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });
    // interceptor  response
    const resIntercepters = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        console.log(error);
        const statusCode = error?.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          logout()
            .then(() => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Logout Succesfully!",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/login");
            })
            .catch();
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(reqIntercepters);
      axiosSecure.interceptors.request.eject(resIntercepters);
    };
  }, [user, logout, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
