import Link from "next/link";
import { useContext } from "react";

export default function Navigation({
    dict
}: {
    dict: any
}) {


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
    ]


    return (
        <div className="flex flex-col text-center mx-auto px-4">
            <h3>{dict["navigation"]}</h3>
            { links.map(link => {
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

            <h3>{dict["partner links"]}</h3>
            { partnerLinks.map(link => {
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

        </div>
    );
}