import FloatInput from '@/Components/Inputs/FloatInput';
import UserCabinetLayout from '@/Layouts/UserCabinetLayout';

export default function Show(props) {
    const {lang, currencies, order} = props;
    const offers = order.offers.map((offer)=>{
        return (
            <tr>
                <td>{offer.item.name}</td>
                <td>{offer.pivot.count}</td>
                <td>{offer.pivot.price}</td>
            </tr>
        );
    });

    return (
        <UserCabinetLayout title={lang["user's order h"]}>
            <h1 className="text-center">{lang["user's order h"]} #{order.id}</h1>

            <div className="row">
            {!order.storage_id &&
                <FloatInput
                    className="col-4 mb-3"
                    value={order.address}
                    labelText={lang["address"]}
                    disabled
                />
            }

                <FloatInput
                    className="col-4 mb-3"
                    value={order.courier_id}
                    labelText={lang["courier"]}
                    disabled
                />

                <FloatInput
                    className="col-4 mb-3"
                    value={order.created_at}
                    labelText={lang["order created_at"]}
                    disabled
                />

                <FloatInput
                    className="col-4 mb-3"
                    value={order.price + order.currency.symbol}
                    labelText={lang["full price"]}
                    disabled
                />

                <FloatInput
                    className="col-4 mb-3"
                    value={order.date_delivered}
                    labelText={lang["date delivered"]}
                    disabled
                />

                <FloatInput
                    className="col-4 mb-3"
                    value={order.delivery_method}
                    labelText={lang["delivery method"]}
                    disabled
                />

                <FloatInput
                    className="col-4 mb-3"
                    value={order.payment_method}
                    labelText={lang["payment method"]}
                    disabled
                />

                <FloatInput
                    className="col-4 mb-3"
                    value={order.payment_status}
                    labelText={lang["payment status"]}
                    disabled
                />

                {order.delivery_method == "post" &&
                    <FloatInput
                        className="col-4 mb-3"
                        value={order.post_index}
                        labelText={lang["post index"]}
                        disabled
                    />
                }


                <FloatInput
                    className="col-4 mb-3"
                    value={order.status}
                    labelText={lang["status"]}
                    disabled
                />

                {order.storage_id &&
                    <FloatInput
                        className="col-4"
                        value={order.address}
                        labelText={lang["address"]}
                        disabled
                    />
                }
            </div>

            <h2 className="text-center">{lang['offers']}</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>{lang['item field name']}</th>
                        <th>{lang['count']}</th>
                        <th>{lang['price']}</th>
                    </tr>
                </thead>

                <tbody>
                    {offers}
                </tbody>
            </table>

        </UserCabinetLayout>
    );
}
