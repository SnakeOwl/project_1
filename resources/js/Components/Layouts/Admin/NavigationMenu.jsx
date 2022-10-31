export default function NavigationMenu(){
    return (
        <div className="list-group">
            <a className="list-group-item d-flex justify-content-between align-items-center group-item-action"
                href={route('supervisor')}>
                Супервизор
                <span class="badge bg-primary rounded-pill">14</span>
            </a>
            <a className="list-group-item d-flex justify-content-between align-items-center group-item-action"
                href={route('orders.index')}>
                Заказы
            </a>
            <a className="list-group-item d-flex justify-content-between align-items-center group-item-action"
                href={route('items.index')}>
                Товары
            </a>
            <a className="list-group-item d-flex justify-content-between align-items-center group-item-action"
                href={route('item-categories.index')}>
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
                href={route('sku-properties.index')}>
                Свойства торговых предложений
            </a>
            <a className="list-group-item d-flex justify-content-between align-items-center group-item-action"
                href="#">
                - Поставщики Ранее использовалось для работы с функционалом внешнего api
            </a>


        </div>
    );
}
