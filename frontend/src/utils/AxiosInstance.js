import axios from "axios";

const DEFAULT_BASE_URL = "http://localhost:3000/api";

export const axiosInstance = axios.create({
    baseURL: DEFAULT_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});


export default axiosInstance;