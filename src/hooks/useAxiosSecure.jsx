// hooks/useAxiosSecure.js
import { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://futurestudy-server.vercel.app", // change to your backend URL
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    // Add request interceptor to add Firebase access token from localStorage
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor to handle unauthorized errors globally
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logOut(); // trigger logout if unauthorized
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut]);

  return axiosSecure;
};

export default useAxiosSecure;
