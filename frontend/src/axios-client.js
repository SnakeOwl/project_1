import axios from "axios";
import apiRoutes from "./config/API_routes.json"

const axiosClient = axios.create({
    baseURL: `${apiRoutes.BASE_URL}/api`
});

axiosClient.interceptors.request.use((config) => {
    const token = (typeof window !== "undefined") ?
            window.localStorage.getItem('ACCESS_TOKEN') :
            "";
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    try {
        const { response } = error;
        if (response.status === 401)
            // user is not authorised
            localStorage.removeItem('ACCESS_TOKEN');
    } catch (e) {
        console.log(e);
    }


    throw error;
});

export default axiosClient;