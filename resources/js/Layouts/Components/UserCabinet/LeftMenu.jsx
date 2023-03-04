import {usePage} from '@inertiajs/inertia-react';

export default function LeftMenu(){
    const {lang} = usePage().props;

    return (
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href={route("personal-page")}>{lang["personal page"]}</a>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href={route("personal-orders")}>{lang['personal orders']}</a>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href={route('personal-data')}>{lang['personal data']}</a>
            </li>
        </ul>
    );
}
