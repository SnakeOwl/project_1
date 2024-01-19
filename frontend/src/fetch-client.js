import FetchHttpClient, { json } from 'fetch-http-client';

const fetchClient = new FetchHttpClient("http://127.0.0.1:8000/api/");

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