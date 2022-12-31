import AdminLayout from '@/Layouts/AdminLayout';
import BlueButton from '@/Components/Buttons/BlueButton'

export default function Index(props){
    const orders = props.orders.data.map((order) => {
        console.log(order);
        return (
            <tr>
                <td>{order.id}</td>
                <td>{order.delivery_method}</td>
                <td>
                    <span className={order.payment_status? "text-success": "text-danger"}>
                        {order.payment_status ? "Оплачено" : "Не оплачено"}
                    </span>
                </td>
                <td>{order.phone}</td>
                <td>{order.price + " " + order.currency.symbol}</td>
                <td>{order.created_at}</td>
                <td>
                    <a href={route('edit-order', order)}>
                        <BlueButton>
                            <i class="bi bi-gear-fill"></i>
                        </BlueButton>
                    </a>
                </td>
            </tr>
        );
    });

    return (
        <AdminLayout
            auth={props.auth}
        >
            <h2>Заказы</h2>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Способ доставки</th>
                    <th>Статус оплаты</th>
                    <th>Телефон</th>
                    <th>Сумма</th>
                    <th>Дата заказа</th>
                </thead>
                <tbody>
                    {orders}
                </tbody>
            </table>

        </AdminLayout>
    );
}
