import {Link} from '../Links';

export default function Pagination({
    className="",
    links
})
{
    const showedLinks = links.map((link)=>{
    	return (
            <li className="page-item">
                <Link className={"page-link " + (link.active && 'disabled')}
                    href={link.url}>
                    {link.label}
                </Link>
            </li>
        );
    });

    return (
        <ul className={"pagination justify-content-center " + className}>
            {showedLinks}
        </ul>
    )
}
