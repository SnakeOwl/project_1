"use client"
import "./globals.css";

import localFont from "next/font/local";
import Footer from "./_Components/Footer";
import Header from "./_Components/Header";
import { Locale, i18n } from '@/i18n-config'
import getDictionaryStatic from "@/utils/get-dictionary-static";
import { ReactNode, useReducer } from "react";
import ReducerUser from "@/context/User/ReducerUser";
import ContextUser from "@/context/User/ContextUser";
import UserContextType from "@/context/User/UserContextType";
import FunctionalOnlyComponent from "./_Components/FunctionalOnlyComponent";
import Loading from "./loading";
import { Suspense } from 'react'
import CookieSection from "./_Components/CookieSection";


const comfortaa = localFont({
    src: [
        {
            path: "../../fonts/Comfortaa.ttf",
        },
    ],
});



export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }))
}


export default function RootLayout(props: {
    children: ReactNode,
    modal: ReactNode,
    params: {
        lang: Locale
    }
}) {

    const dict = getDictionaryStatic(props.params.lang);
    // todo: глянуть как делают Контексты на TS
    const updatedStateUser: UserContextType = {
        token: undefined,
        bkey: undefined
    };


    const [stateUser, dispatchUser] = useReducer(ReducerUser, updatedStateUser);

    // todo: придумать как можно обойтись без этих двух контекстов, чтобы перенести этот код на серверную часть.
    return (
        <html lang={props.params.lang}>
            <head>
                <meta property="og:title" content={dict["og:title"]} />
                <meta property="og:description" content={dict["og:description"]} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nextjs.org" />
            </head>
            <body className={`${comfortaa.className} bg-white dark:bg-gray-950 dark:text-gray-300 px-4 xl:px-0`}>
                

                <ContextUser.Provider value={{ stateUser, dispatchUser }}>
                    <FunctionalOnlyComponent />
                    <Header dict={dict} />


                    <Suspense fallback={<Loading />}>
                        {props.children}
                        {props.modal}
                    </Suspense>

                </ ContextUser.Provider>

                <Footer dict={dict}/>
                <CookieSection dict={dict} />
            </body>
        </html>
    );
}
