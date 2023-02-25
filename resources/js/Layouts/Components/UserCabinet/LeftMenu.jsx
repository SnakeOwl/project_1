import {usePage} from '@inertiajs/inertia-react';

export default function LeftMenu(){
    const {lang, auth} = usePage().props;

    return (
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href={route("personal-page", auth.user)}>{lang["personalPage"]}</a>
                <span class="badge bg-primary rounded-pill">14</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href={route("personal-orders")}>{lang['personalOrders']}</a>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href={route('personal-data')}>{lang['personalData']}</a>
            </li>
        </ul>
    );
}
