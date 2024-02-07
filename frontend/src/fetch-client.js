import FetchHttpClient, { json } from 'fetch-http-client';

const fetchClient = new FetchHttpClient(`${process.env.NEXT_PUBLIC_BASE_URL}/api/`);

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