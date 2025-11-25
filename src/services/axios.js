import axios from "axios";
import { refreshAccessToken } from "./apis";

const BASE_URL = "https://shopease-khaki.vercel.app/api";

const Axios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

Axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if ((error.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await refreshAccessToken();
                console.log("Access token refreshed automatically!");
                return Axios(originalRequest);
            } catch (error) {
                console.log(error);
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
)

export default Axios;