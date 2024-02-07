"use client"
import Link from "next/link";
import Logo from "@/_Components/Logo";
import LangChanger from "./Header/LangChanger";
import LogoutButton from "./Header/LogoutButton";
import BasketButton from "./Header/BasketButton";
import { useContext } from "react";
import ContextUser from "@/context/User/ContextUser";
import { BlueLink, BlueLinkReversed } from "@/_Components/ColoredLinks";


export default function Header({ dict }: {dict: any}) {

    const { stateUser } = useContext(ContextUser);


    return (
        <header className="border-b-2 dark:border-gray-900 py-4 mb-4">
            <div className="flex flex-wrap 2xl:w-2/3 w-full mx-auto  items-center">
                <div className="2xl:block xl:w-1/3">{process.env.ENV_LOCAL_VARIABLE}</div>

                <div className="w-full xl:w-2/3 px-4 flex items-center">
                    <div className="w-1/2 xl:text-center">
                        <Link href="/" className="h1"> <Logo /> </Link>
                    </div>

                    <div className="w-1/2 h-full text-sm flex items-center justify-end ">
                        {typeof stateUser.bkey === "string" &&
                            <BasketButton />
                        }

                        {stateUser.token !== undefined ?
                            <>
                                <BlueLinkReversed
                                    className="px-2 py-1 rounded mr-4"
                                    href={"/user/personal-page"}>
                                    <i className="bi bi-person-fill"></i>
                                </BlueLinkReversed>

                                <LogoutButton />
                            </>
                            :
                            <BlueLink
                                className="py-1 px-3 mr-3 rounded-md"
                                href={"/login"} >
                                {dict["login"]}
                            </BlueLink>
                        }

                        <LangChanger dict={dict} />
                    </div>
                </div>
            </div>
        </header>
    );
}