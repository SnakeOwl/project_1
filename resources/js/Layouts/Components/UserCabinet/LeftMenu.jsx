import {usePage} from '@inertiajs/inertia-react'
import {Inertia} from '@inertiajs/inertia'

export default function LeftMenu(){
    const {lang} = usePage().props;

    const menu = [
        {route: "/user/",     name: lang["personal page"] },
        {route: "/user/orders",   name: lang["personal orders"] },
        {route: "/user/data",     name: lang["personal data"] }
    ]

    const links = menu.map((element)=>{
        return (
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <a onClick={()=>Inertia.get(element.route)} href="#">{element.name}</a>
            </li>
        );
    });

    return (
        <ul class="list-group">
            {links}
        </ul>
    );
}
