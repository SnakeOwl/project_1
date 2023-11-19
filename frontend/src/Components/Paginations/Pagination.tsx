import { BlueButtonReversed } from "@/Components/Buttons/ColoredButtons"
import axiosClient from "@/axios-client"
import IPaginationLink from "@/interfaces/IPaginationLink";

export default function Pagination({
    links,
    setState,
    index, // orders, items , offers ... type of taking data
    className = ""
}: {
    setState: Function,
    index: string,
    className: string,

    links: IPaginationLink[],
}) {

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }


    async function handleClick(url: string) {
        await axiosClient.get(url)
            .then(({ data }) => {
                setState(data[index].data)
            })
            .catch(error => {
                console.log("errror in the Pagination component");
            });


        scrollToTop();
    }




    return (
        <div className={`${className} w-fit flex mx-auto`}>
            {

                links.map(link => {
                    const activeC = link.active === true ? "ring-blue-950 cursor-default" : "";
                    return (
                        <BlueButtonReversed
                            key={link.label}
                            className={`py-1 px-3 first:rounded-l-md last:rounded-r-md ${activeC}`}
                            onClick={() => handleClick(link.url)}
                        >
                            {link.label}
                        </BlueButtonReversed>
                    )
                })
            }
        </div>
    )
}