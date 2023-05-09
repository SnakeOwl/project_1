import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import SighUp from "./Pages/SighUp.jsx";
import Error_404 from "./Pages/Errors/404";
import Layout from "./Layouts/Layout";
import Catalog from "./Pages/Catalog/Catalog";
import PersonalPage from "./Pages/PersonalPage";
import Offer from "./Pages/Catalog/Offer";
import Basket from "./Pages/Basket/Basket";
import OrderForm from "./Pages/Basket/OrderForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [

            {
                path: '/:category?',
                element: <Catalog />
            },
            {
                path: '/offer/:offerId',
                element: <Offer />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SighUp />
            },
            {
                path: '/personal-page',
                element: <PersonalPage />
            },
            {
                path: '/basket',
                element: <Basket />
            },
            {
                path: '/basket/order',
                element: <OrderForm />
            },
            {
                path: '/404',
                element: <Error_404 />
            },
            
        ]
    },
    
    {
        path: '*',
        element: <Error_404 />
    },
]);

export default router;