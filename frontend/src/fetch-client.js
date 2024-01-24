import FetchHttpClient, { json } from 'fetch-http-client';
import apiRoutes from "./config/API_routes.json"

const fetchClient = new FetchHttpClient(`${apiRoutes.BASE_URL}/api/`);

// Add access token
if (typeof window !== "undefined") {
    fetchClient.addMiddleware(request => {
        const token = window.localStorage.getItem('ACCESS_TOKEN');
        request.options.headers['Authorization'] = `Bearer ${token}`;
    });
}

// Add json support
fetchClient.addMiddleware(json());


export default fetchClient;