import {usePage} from "@inertiajs/inertia-react";

export default function NavigationMenu(){
    const {lang, menuInfo} = usePage().props;
    const aClassName = "list-group-item d-flex justify-content-between align-items-center group-item-action";
    return (
        <div className="list-group">
            <a className={aClassName} href={route('supervisor')}>
                {lang['supervisor']}
            </a>
            <a className={aClassName} href={route('all-orders')}>
                {lang['orders']}
                <span class="badge bg-primary rounded-pill">{menuInfo.countOrders}</span>
            </a>
            <a className={aClassName} href={route('items.index')}>
                {lang['goods']}
                <span class="badge bg-primary rounded-pill">{menuInfo.countItems} / {menuInfo.countOffers}</span>
            </a>
            <a className={aClassName} href={route('subscribers.index')}>
                {lang['subscribers']}
                <span class="badge bg-primary rounded-pill">{menuInfo.countSubscribers}</span>
            </a>
            <a className={aClassName} href={route('categories.index')}>
                {lang['categories']}
                <span class="badge bg-primary rounded-pill">{menuInfo.countCategories}</span>
            </a>
            <a className={aClassName} href={route('users.index')}>
                {lang['users']}
                <span class="badge bg-primary rounded-pill">{menuInfo.countUsers}</span>
            </a>
            <a className={aClassName} href={route('storages.index')}>
                Склады
                <span class="badge bg-primary rounded-pill">{menuInfo.countStorages}</span>
            </a>
            <a className={aClassName} href={route('messages.index')}>
                Письма пользователей
                <span class="badge bg-primary rounded-pill">{menuInfo.countMessages}</span>
            </a>

            <a className="d-none" href="#">
                - Поставщики Ранее использовалось для работы с функционалом внешнего api
            </a>
            <a className="d-none" href="#">
                - Курьеры (подумать как переделать)
            </a>
        </div>
    );
}
