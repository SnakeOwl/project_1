import UserCabinetLayout from '@/Layouts/UserCabinetLayout';
import Pagination from '@/Components/Paginations/Pagination';
import BlueLink from '@/Components/Links/BlueLink';

export default function PersonalPage(props) {
    const lang = props.lang;
console.log(props);

    const activeOrders = props.activeOrders.data.map((order)=> {
        return (
            <tr>
                <td>{order.id}</td>
                <td>{order.delivery_method}</td>
                <td>{order.status}</td>
                <td>{order.price + " " + order.currency.symbol}</td>
                <td>
                    <BlueLink href={route('show-personal-order', order)} title={lang['about']}>
                        <i class="bi bi-clipboard-pulse"></i>
                    </BlueLink>
                </td>
            </tr>
        )
    });

    return (
        <UserCabinetLayout title={lang['personalPage']}>

            <h1>{lang['personalPage']}</h1>

            <div className="col-12 ">
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

                <div className="row">
                    <Pagination
                        className="justify-content-center"
                        links={props.activeOrders.links}
                     />
                </div>
            </div>

        </UserCabinetLayout>
    );
}
