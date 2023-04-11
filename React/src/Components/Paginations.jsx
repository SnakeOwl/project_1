import NETWORK from "../config/network";

export default function Pagination({
    className="",
    links,
    onHandleClick
})
{
    const showedLinks = links.map((link)=>{
    	return (
            <li key={link.label} className="page-item">
                <a
                    className={"page-link " + (link.active && 'disabled')}
                    onClick={()=>onHandleClick(link.url)}
                    href="#"
                >
                    {link.label}
                </a>
            </li>
        );
    });

    return (
        <ul className={"pagination justify-content-center " + className}>
            {showedLinks}
        </ul>
    )
}
