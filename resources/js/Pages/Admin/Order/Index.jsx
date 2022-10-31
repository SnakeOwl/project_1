import AdminLayout from '@/Layouts/AdminLayout';
import BlueButton from '@/Components/Buttons/BlueButton'

export default function Index(props){
    const orders = props.orders.data.forEach((order) => {
        return (
            <tr>
                <td>{order.id}</td>
                <td>{order.address}</td>
                <td>{order.payment_status ? "Оплачено" : "Не оплачено"}</td>
                <td>{order.phone}</td>
                <td>{order.price}</td>
                <td>{order.created_at}</td>
                <td>
                    <a href={route('orders.edit', order.id)}>
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
                    <th>Адрес</th>
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
