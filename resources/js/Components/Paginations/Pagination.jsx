import Link from '@/Components/Links/Link';

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
        <ul class={"pagination justify-content-center " + className}>
            {showedLinks}
        </ul>
    )
}
