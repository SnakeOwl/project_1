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
            route: '/admin/orders',
            name: lang['orders'],
            upperName: menuInfo.countOrders,
        },
        {   
            route: '/admin/items',
            name: lang['goods'],
            upperName: menuInfo.countItems + "/" + menuInfo.countOffers,
        },
        {   
            route: '/admin/subscribers',
            name: lang['subscribers'],
            upperName: menuInfo.countSubscribers,
        },
        {   
            route: '/admin/categories',
            name: lang['categories'],
            upperName: menuInfo.countCategories,
        },
        {   
            route: '/admin/users',
            name: lang['users'],
            upperName: menuInfo.countUsers,
        },
        {   
            route: '/admin/storages',
            name: lang['storages'],
            upperName: menuInfo.countStorages,
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
