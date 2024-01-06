import "server-only"
import "./globals.css";

import localFont from "next/font/local";
import Footer from "./_Components/Footer";
import { Locale, i18n } from '@/i18n-config'
import { ReactNode, Suspense } from "react";
import CookieSection from "./_Components/CookieSection";
import ParticlesWrapper from "./_Components/ParticlesWrapper";
import { getDictionary } from "@/utils/get-dictionary";
import UserProvider from "./_Components/UserProvider";
import Loading from "./loading";
import Header from "./_Components/Header";
import FunctionalOnlyComponent from "./_Components/FunctionalOnlyComponent";


const comfortaa = localFont({
    src: [
        { path: "../../fonts/Comfortaa.ttf" },
    ],
});

export const revalidate = 3600; // chashe for fetch(), time in seconds


export default async function RootLayout(props: {
    children: ReactNode,
    modal: ReactNode,
    mod: ReactNode,
    params: {
        lang: Locale
    }
}) {
    const dict = await getDictionary(props.params.lang);
// console.log(i18n.locales.map((locale) => ({ lang: locale })))   // [ { lang: 'en' }, { lang: 'ru' } ]
    return (
        <html lang={props.params.lang}>
            <head>
                <meta property="og:title" content={dict["og:title"]} />
                <meta property="og:description" content={dict["og:description"]} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nextjs.org" />
            </head>
            <body className={`${comfortaa.className} bg-white dark:bg-gray-950 dark:text-gray-300 px-4 xl:px-0`}>
                <ParticlesWrapper>
                    <UserProvider>
                        <FunctionalOnlyComponent />
                        <Header dict={dict} />


                        <Suspense fallback={<Loading />}>
                            <div className="p-4">
                                {props.children}
                            </div>
                        </Suspense>
                    </UserProvider>

                    <Footer dict={dict} />
                    <CookieSection dict={dict} />
                </ParticlesWrapper>
            </body>
        </html >
    );
}


export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}
