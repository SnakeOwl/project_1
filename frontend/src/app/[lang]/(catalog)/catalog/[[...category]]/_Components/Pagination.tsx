import { useRouter, useSearchParams } from "next/navigation"


// todo: заменить пагинацию на кнопочку "Ещё"
export default function Pagination({
    links
}: {
    links: [{
        url: string,
        label: string,
        active: boolean
    }]
}) {

    const searchParams = useSearchParams();
    const router = useRouter();


    async function handleClick(url: string) {
        let newUrl = url;
        // для синхронизации с выбранными опциями, вытягиваю их из адресной строки
        if (searchParams.get('options') !== null){
            const searchOptions =  "&options=" + searchParams.get('options');
            newUrl += searchOptions;
        }

        router.push(newUrl);
    }


    const classes = "text-sm xl:text-base py-1 2xl:px-3 px-2 first:rounded-l-md last:rounded-r-md border border-gray-300 dark:border-gray-700";

    return (
        <div className="w-fit flex mx-auto ">
            {
                links.map(link => {
                    if (link.active === true)
                        return <button className={`${classes} bg-gray-200 dark:bg-gray-900`} key={link.label} type="button">{link.label}</button>
                        const url = link.url?.substr( link.url.indexOf('?') )
                    
                    return (
                        <button
                            key={link.label}
                            className={`${classes} dark:hover:bg-gray-800`}
                            onClick={() => handleClick(url)}
                        >
                            {link.label}
                        </button>
                    )
                })
            }
        </div>
    )
}