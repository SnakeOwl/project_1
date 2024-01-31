"use client"
import { BlueButtonReversed, PurpleButtonReversed } from "@/_Components/Buttons/ColoredButtons"
import Link from "next/link";
import { memo, useEffect, useState } from "react"

const CookieSection = function ({ dict }: { dict: any }) {

    const [hidden, setHidden] = useState<boolean>();


    function hide(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        localStorage.setItem("cookieIsOK", "checked");
        setHidden(true);
    }

    useEffect(() => {
        if (localStorage.getItem("cookieIsOK"))
            setHidden(true);
    }, [])


    return (
        <div className={"  dark:bg-gray-950/75 bg-gray-50 border-t dark:border-gray-800 border-gray-200 py-8 fixed bottom-0 left-0 right-0 " + (hidden && "hidden")} >
            <div className="2xl:w-2/3 w-full mx-auto dark:text-white text-black ">
                <p className="text-center">{dict["cookie info"]}</p>
                <div className="text-center">
                    <Link href={"#"} onClick={hide}>
                        Ok!
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default memo(CookieSection)