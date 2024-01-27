"use client"

import Navigation from "./_Components/Navigation";
import getDictionaryStatic from "@/utils/get-dictionary-static";
import { Locale } from "@/i18n-config";
import { useContext, useEffect } from "react";
import ContextUser from "@/context/User/ContextUser";
import { useRouter } from "next/navigation";
import MobileMenuArea from "@/_Components/menu/MobileMenuArea";


export default function UserLayout(props: {
    children: React.ReactNode,
    params: {lang: Locale}
}) {

    const dict = getDictionaryStatic(props.params.lang);


    const { stateUser } = useContext(ContextUser);
    const router = useRouter();

    useEffect(() => {

        // Если тут проверять по StateUser.token, то при перезагрузке страницы оно на пару секунд выкидывает пользователя на форму логина
        if (localStorage.getItem("ACCESS_TOKEN") == undefined)
            router.push("/login");

    }, [stateUser.token]);


    return (
        <div className="w-full 2xl:w-4/5 mx-auto flex flex-wrap">
            <div className="w-full xl:w-1/4">
                <MobileMenuArea>
                    <Navigation dict={dict} />
                </MobileMenuArea>
            </div>

            <div className="w-full xl:w-3/4">
                {props.children}
            </div>
        </div>
    )

}