import {usePage} from "@inertiajs/inertia-react";

export default function NavigationMenu(){
    const {lang, menuInfo} = usePage().props;
    return (
        <div className="list-group">
            <a className="list-group-item d-flex justify-content-between align-items-center group-item-action"
                href={route('supervisor')}>
                Супервизор
            </a>
            <a className="list-group-item d-flex justify-content-between align-items-center group-item-action"
                href={route('all-orders')}>
                Заказы
                <span class="badge bg-primary rounded-pill">{menuInfo.countOrders}</span>
            </a>
            <a className="list-group-item d-flex justify-content-between align-items-center group-item-action"
                href={route('items.index')}>
                Товары
                <span class="badge bg-primary rounded-pill">{menuInfo.countItems} / {menuInfo.countOffers}</span>

            </a>
            <a className="list-group-item d-flex justify-content-between align-items-center group-item-action"
                href={route('categories.index')}>
                Категории товаров
            </a>
            <a className="list-group-item d-flex justify-content-between align-items-center group-item-action"
                href={route('users.index')}>
                Пользователи
            </a>
            <a className="list-group-item d-flex justify-content-between align-items-center group-item-action"
                href="#">
                - Курьеры (подумать как переделать)
            </a>
            <a className="list-group-item d-flex justify-content-between align-items-center group-item-action"
                href={route('storages.index')}>
                Склады
            </a>
            <a className="list-group-item d-flex justify-content-between align-items-center group-item-action"
                href={route('messages.index')}>
                Письма пользователей
            </a>
            <a className="list-group-item d-flex justify-content-between align-items-center group-item-action"
                href="#">
                - Поставщики Ранее использовалось для работы с функционалом внешнего api
            </a>
        </div>
    );
}
