import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./Pages/User/Login";
import SighUp from "./Pages/User/SighUp.jsx";
import Error_404 from "./Pages/Errors/404";
import Layout from "./Layouts/Layout";
import Catalog from "./Pages/Catalog/Catalog";
import PersonalPage from "./Pages/User/PersonalPage";
import Offer from "./Pages/Catalog/Offer";
import Basket from "./Pages/Basket/Basket";
import OrderForm from "./Pages/Basket/OrderForm";
import ContactForm from "./Pages/ContactForm";
import UserLayout from "./Layouts/UserLayout";
import ILayout from "./Layouts/ILayout";
import PersonalData from "./Pages/User/PersonalData";
import PersonalOrder from "./Pages/User/PersonalOrder";

const router = createBrowserRouter([
    {
        // шаблон в шаблоне нужен, чтобы вытаскивать контекст из первого(ILayout).
        path: '/',
        element: <ILayout />,
        children: [
            {
                path: '/',
                element: <Layout />,
                children:[
                    {
                        path: ':category?',
                        element: <Catalog />
                    },
                    {
                        path: 'offer/:offerId',
                        element: <Offer />
                    },
                    {
                        path: 'login',
                        element: <Login />
                    },
                    {
                        path: 'signup',
                        element: <SighUp />
                    },
                    {
                        path: 'contacts',
                        element: <ContactForm />
                    },
                    {
                        path: 'basket',
                        element: <Basket />
                    },
                    {
                        path: 'basket/order',
                        element: <OrderForm />
                    },
                    {
                        path: '404',
                        element: <Error_404 />
                    },
                ]
            },
            {
                path: '/user/',
                element: <UserLayout />,
                children: [
                    {
                        path: '',
                        element: <PersonalPage />
                    },
                    {
                        path: 'data',
                        element: <PersonalData />
                    },
                    {
                        path: 'orders/:orderId',
                        element: <PersonalOrder />
                    },
                ]
            },
        ]
    },
    {
        path: '*',
        element: <Error_404 />
    },
]);

export default router;