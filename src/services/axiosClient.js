import axios from "axios";

const BASE_URL = "https://shopease-backend-eight.vercel.app/api";

const Axios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

Axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await Axios.get("/auth/refresh");
                return Axios(originalRequest);
            } catch (err) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default Axios;