import axios from "axios";
import { refreshAccessToken } from "./apis";

const BASE_URL = "https://shopease-backend-eight.vercel.app/api";
// const BASE_URL = "http://localhost:3000/api";

const Axios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

let isRefreshing = false;

Axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true

                try {
                    await refreshAccessToken();
                    isRefreshing = false;
                    return Axios(originalRequest);
                } catch (error) {
                    isRefreshing = false;
                    window.location.href = "/login";
                    return Promise.reject(err);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default Axios;