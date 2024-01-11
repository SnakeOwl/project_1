import { BlueButton, BlueButtonReversed } from "@/_Components/Buttons/ColoredButtons"
import axiosClient from "@/axios-client"
import ContextCatalog from "@/context/Catalog/ContextCatalog"
import Link from "next/link"
import { useContext } from "react"





export default function Pagination({
    links
}: {
    links: [{
        url: string,
        label: string,
        active: boolean
    }]
}) {

    const { dispatchCatalog } = useContext(ContextCatalog);


    function scrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }


    async function handleClick(url: string) {
        await axiosClient.get(url)
            .then(({ data }: { data: { offers: [] } }) => {

                dispatchCatalog({
                    type: "SET_OFFERS",
                    offers: data.offers
                });
            })
            .catch(error => {
                console.log(error);
            })

        scrollToTop();
    }


    const classes = "text-sm xl:text-base py-1 2xl:px-3 px-2 first:rounded-l-md last:rounded-r-md border border-gray-300 dark:border-gray-700";

    return (
        <div className="w-fit flex mx-auto ">
            {

                links.map(link => {
                    if (link.active === true)
                        return <button className={`${classes} bg-gray-200 dark:bg-gray-900`} key={link.label} type="button">{link.label}</button>
                        
                    
                    return (
                        <button
                            key={link.label}
                            className={`${classes} dark:hover:bg-gray-800`}
                            onClick={() => handleClick(link.url)}
                        >
                            {link.label}
                        </button>
                    )
                })
            }
        </div>
    )
}