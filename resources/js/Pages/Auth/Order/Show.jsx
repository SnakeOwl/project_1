import UserCabinetLayout from '@/Layouts/UserCabinetLayout';

export default function Show(props) {
    const lang = props.lang;
    const currencies = props.currencies;

    console.log(props);


    return (
        <UserCabinetLayout title={lang['allUserOrders']}>

            <h1>{lang['allUserOrders']}</h1>

            <div className="col-12 ">
                <h2>{lang['allUserOrders']}</h2>
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

                <div className="row">
                    <Pagination
                        className="justify-content-center"
                        links={props.orders.links}
                     />
                </div>
            </div>

        </UserCabinetLayout>
    );
}
