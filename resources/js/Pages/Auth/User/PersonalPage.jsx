import {Inertia} from "@inertiajs/inertia"
import UserCabinetLayout from '@/Layouts/UserCabinetLayout'
import Pagination from '@/Components/Paginations/Pagination'
import BlueButton from '@/Components/Buttons/BlueButton'

export default function PersonalPage(props) {
    const {lang} = props;

    const activeOrders = props.activeOrders.data.map((order)=> {
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
        <UserCabinetLayout title={lang['personal page']}>

            <h1 className="text-center">{lang['personal page']}</h1>

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
                        {activeOrders}
                    </tbody>
                </table>
            </div>

            <Pagination
                className="justify-content-center"
                links={props.activeOrders.links}
             />

        </UserCabinetLayout>
    );
}
