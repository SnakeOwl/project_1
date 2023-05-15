import { Inertia } from '@inertiajs/inertia'
import AdminLayout from '@/Layouts/AdminLayout'
import {BlueButton} from '@/Components/Buttons'
import Pagination from '@/Components/Paginations/Pagination'

export default function Index(props){
    const {lang} = props;
    const orders = props.orders.data.map((order) => {
        return (
            <tr>
                <td>{order.id}</td>
                <td>
                    <span className={order.payment_status? "text-success": "text-danger"}>
                        {order.payment_status ? lang["is paid"] : lang["is not paid"]}
                    </span>
                </td>
                <td>{order.phone}</td>
                <td>{order.price + " " + order.currency.symbol}</td>
                <td>{order.created_at}</td>
                <td>
                    <BlueButton onHandleClick={()=>Inertia.get(`/admin/orders/edit/${order.id}`)}>
                        <i class="bi bi-gear-fill"></i>
                    </BlueButton>
                </td>
            </tr>
        );
    });

    return (
        <AdminLayout title={lang['orders h']}>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>{lang["payment status"]}</th>
                    <th>{lang["phone"]}</th>
                    <th>{lang['price']}</th>
                    <th>{lang["order created_at"]}</th>
                </thead>
                <tbody>
                    {orders}
                </tbody>
            </table>

            <Pagination links={props.orders.links} />

        </AdminLayout>
    );
}
