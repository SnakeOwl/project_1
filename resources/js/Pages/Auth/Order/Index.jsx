import {Inertia} from "@inertiajs/inertia"
import UserCabinetLayout from '@/Layouts/UserCabinetLayout';
import Pagination from '@/Components/Paginations/Pagination';
import BlueButton from '@/Components/Buttons/BlueButton';

export default function Index(props) {
    const {lang, currencies} = props;
    const orders = props.orders.data.map((order)=> {
        return (
            <tr>
                <td>{order.id}</td>
                <td>{order.delivery_method}</td>
                <td>{order.status}</td>
                <td>{order.price + " " + order.currency.symbol}</td>
                <td>
                    <BlueButton
                        onHandleClick={()=>Inertia.get(route('show-personal-order', order))}
                        title={lang['about']}
                    >
                        <i class="bi bi-clipboard-pulse"></i>
                    </BlueButton>
                </td>
            </tr>
        )
    });


    return (
        <UserCabinetLayout title={lang['personal orders']}>
            <h1 className="text-center">{lang['personal orders']}</h1>
            <div className="overflow-x-auto mb-2">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{lang['deliveryMethod']}</th>
                            <th>{lang['status']}</th>
                            <th>{lang['price']}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders}
                    </tbody>
                </table>
            </div>

            <Pagination
                links={props.orders.links}
             />
        </UserCabinetLayout>
    );
}
