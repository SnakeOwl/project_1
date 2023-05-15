import { useContext } from "react";
import axiosClient from "/src/axios-client";

export default function Pagination({
    className="",
    links,
    changePageFunc,
})
{
    const showedLinks = links.map((link)=>{
    	return (
            <li key={link.label} className="page-item">
                <button
                    className={"page-link " + (link.active && 'box-blue')}
                    onClick={()=>changePageFunc(link.url)}
                    disabled={!link.active}
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
