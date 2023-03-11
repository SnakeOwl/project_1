import { Inertia } from '@inertiajs/inertia'
import {usePage} from "@inertiajs/inertia-react";

export default function NavigationMenu(){
    const {lang, menuInfo} = usePage().props;

    const menuData = [
        {   route: route('supervisor'),
            name: lang['supervisor'],
            upperName: false,
        },
        {   route: route('all-orders'),
            name: lang['orders'],
            upperName: menuInfo.countOrders,
        },
        {   route: route('items.index'),
            name: lang['goods'],
            upperName: menuInfo.countItems + "/" + menuInfo.countOffers,
        },
        {   route: route('subscribers.index'),
            name: lang['subscribers'],
            upperName: menuInfo.countSubscribers,
        },
        {   route: route('categories.index'),
            name: lang['categories'],
            upperName: menuInfo.countCategories,
        },
        {   route: route('users.index'),
            name: lang['users'],
            upperName: menuInfo.countUsers,
        },
        {   route: route('storages.index'),
            name: lang['storages'],
            upperName: menuInfo.countStorages,
        },
        {   route: route('messages.index'),
            name: lang['messages h'],
            upperName: menuInfo.countMessages,
        },
        {   route: route('oneClickForm.index'),
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
