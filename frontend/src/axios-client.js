import axios from "axios";
import apiRoutes from "./config/API_routes.json"


// todo: в доках к nextjs сказано что fetch содержит кеш данных. Чекнуть, аксиос тоже считается как fetch или там свой алгоритм
const axiosClient = axios.create({
    baseURL: `${apiRoutes.BASE_URL}/api`
});

if (typeof window !== "undefined"){
    axiosClient.interceptors.request.use((config) => {
        const token = window.localStorage.getItem('ACCESS_TOKEN');
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
}

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