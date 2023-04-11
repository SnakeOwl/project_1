import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import SighUp from "./Pages/SighUp.jsx";
import Users from "./Pages/Users.jsx";
import Error_404 from "./Pages/Errors/404";
import Layout from "./Layouts/Layout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Navigate to={"/login"} />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/sighup',
                element: <SighUp />
            },
            {
                path: '/users',
                element: <Users />
            },
        ]
    },
    

    {
        path: '*',
        element: <Error_404 />
    },
]);

export default router;