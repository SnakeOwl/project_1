"use client"
import { useEffect, useState } from "react";

export default function MobileMenuArea(props: any) {

    const [hidden, setHidden] = useState<boolean>(true);


    return (
        <div className=" xl:block xl:static flex h-full fixed top-0 left-0">
            <div className={hidden ? "w-0 overflow-hidden xl:w-full" : "w-full bg-white dark:bg-gray-950 pt-8 overflow-scroll"}>
                {props.children}
            </div>

            <div
                className="bg-blue-600 text-white w-auto self-center py-2 px-1 rounded-r-md xl:hidden"
                onClick={() => setHidden(!hidden)}
            >
                {hidden ?
                    <i className="bi bi-caret-right-fill"></i>
                    :
                    <i className="bi bi-caret-left-fill"></i>
                }
            </div>
        </div>
    )
}