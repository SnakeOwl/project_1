import { Inertia } from '@inertiajs/inertia'
import {usePage} from "@inertiajs/inertia-react";

export default function NavigationMenu(){
    const {lang, menuInfo} = usePage().props;

    const menuData = [
        {   
            route: '/admin/',
            name: lang['supervisor'],
            upperName: false,
        },
        {   
            route: '/admin/subscribers',
            name: lang['subscribers'],
            upperName: menuInfo.countSubscribers,
        },
        {   
            route: '/admin/users',
            name: lang['users'],
            upperName: menuInfo.countUsers,
        },
        {   
            route: '/admin/messages',
            name: lang['messages h'],
            upperName: menuInfo.countMessages,
        },
        {   
            route: '/admin/oneClickForm',
            name: lang['one click form h'],
            upperName: false,
        }
    ];


    const links = menuData.map((link)=>{
        return (
            <a
                className="list-group-item d-flex justify-content-between align-items-center group-item-action"
                onClick={()=>Inertia.get(link.route)}
                href="#"
            >
                {link.name}

                {link.upperName !== false &&
                    <span class="badge bg-primary rounded-pill">{link.upperName}</span>
                }
            </a>
        );
    });

    return (
        <div className="list-group">
            {links}
        </div>
    );
}
