import { useContext } from "react";
import axiosClient from "/src/axios-client";

export default function Pagination({
    className="",
    links,
    setOffers,
})
{
    function changePage(url){
        axiosClient.get(url)
            .then(({data})=>{
                setOffers(data.offers);
            });
    }
    
    const showedLinks = links.map((link)=>{
    	return (
            <li key={link.label} className="page-item">
                <button
                    className={"page-link " + (link.active && 'disabled')}
                    onClick={()=>changePage(link.url)}
                >
                    {link.label}
                </button>
            </li>
        );
    });

    return (
        <ul className={"pagination justify-content-center " + className}>
            {showedLinks}
        </ul>
    );
}
