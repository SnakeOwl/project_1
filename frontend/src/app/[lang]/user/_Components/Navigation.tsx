"use client"
import getUser from "@/utils/getUser";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Navigation({
    dict
}: { dict: any }) {

    const [rights, setRights] = useState(3);

    useEffect(() => {
        // проверка прав пользователя
        Promise.resolve(getUser())
            .then((result) => {
                if (result !== false)
                    setRights(result.rights)
            });
    }, []);


    const links = [
        {
            text: dict["personal page"],
            href: "/user/personal-page",
        },
        {
            text: dict["personal data"],
            href: "/user/personal-data",
        },
        {
            text: dict["personal orders"],
            href: "/user/personal-orders",
        },
    ];


    const partnerLinks = [
        {
            text: dict["goods"],
            href: "/user/partner/goods"
        }
    ];


    const adminLinks = [
        {
            text: "Админка",
            href: "/user/admin"
        },
        {
            text: "Заказы",
            href: "/user/admin/orders"
        },
        // {
        //     text: "Товары",
        //     href: "/user/admin/items/page"
        // },
        // {
        //     text: "Подписчики",
        //     href: "/user/admin/subscribers/page"
        // },
        {
            text: "Категории",
            href: "/user/admin/categories"
        },
        {
            text: "Пользователи",
            href: "/user/admin/users"
        },
        {
            text: "Склады",
            href: "/user/admin/storages"
        },
        // {
        //     text: "Письма пользователей",
        //     href: "/user/admin/messages/page"
        // },
        {
            text: "Запросы на покупку в один клик",
            href: "/user/admin/one-click-requests"
        },
    ];



    return (
        <div className="flex flex-col text-center mx-auto px-4">

            <h3>{dict["navigation"]}</h3>
            {links.map(link => {
                return (
                    <Link
                        key={link.href}
                        className="py-2"
                        href={link.href}
                    >
                        {link.text}
                    </Link>
                )
            })
            }


            {rights === 6 &&
                <>
                    <h3>{dict["partner links"]}</h3>
                    {partnerLinks.map(link =>
                        <Link
                            key={link.href}
                            className="py-2"
                            href={link.href}
                        >
                            {link.text}
                        </Link>
                    )
                    }
                </>
            }


            {rights === 10 &&
                <>
                    <h3>Администрирование</h3>
                    {adminLinks.map(link =>
                        <Link
                            key={link.href}
                            className="py-2"
                            href={link.href}
                        >
                            {link.text}
                        </Link>
                    )
                    }
                </>
            }

        </div>
    );
}
