import axios from "axios";

// nextj не кеширует данные, пришедшие с axiosClient.
// для кешированя использовать fetchClient
const axiosClient = axios.create({
    
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`
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