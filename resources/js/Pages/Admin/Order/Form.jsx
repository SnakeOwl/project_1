import AdminLayout from '@/Layouts/AdminLayout';
import {BlueButton} from '@/Components/Buttons'
import StandartInput from '@/Components/Inputs/StandartInput'
import { useForm } from '@inertiajs/inertia-react';
import { Link } from '@/Components/Links';

export default function Form(props){
    const {lang, order, basket, offers} = props;

console.log(basket);
    const { data, setData, get, errors} = useForm({
        status: order? order.status: "",
    });

    const fields = [];
    for (let prop in order){
         fields.push(
             <tr key={`${prop}`}>
                 <td>{prop}:</td>
                 <td>{order[prop]}</td>
             </tr>
         );
    }

    function onHandleChange (event){
        setData(event.target.name, event.target.value);
    };

    

    return (
        <AdminLayout title={lang["order form"]}>

            <table className="table table-striped">
                <tbody>
                    {fields}
                </tbody>
            </table>

            <h2>{lang["order offers"]}</h2>
            {offers !== null && offers.length > 0 &&
                <table className='table mb-3'>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>{lang["price"]} * {lang["count"]}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.map(offer=>{
                            return (
                                <tr key={`offer-${offer.id}`}>
                                    <td>
                                        <Link href={`/catalog/${offer.item.name}/${offer.id}`}>{offer.id}</Link>
                                    </td>
                                    <td>{offer.price} * {offer.pivot.count}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            }

            {basket !== null &&
                <table className='table mb-3'>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>{lang["price"]} * {lang["count"]}</td>
                            <td>{lang["offer"]}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {basket.offers.map(offer=>{
                            return (
                                <tr key={`offer-${offer.id}`}>
                                    <td>
                                        <Link href={`/catalog/${offer.item.name}/${offer.id}`}>{offer.id}</Link>
                                    </td>
                                    <td>{offer.price} * {offer.pivot.count}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            }

            <div className="text-center my-3">
                <h2>{lang['change order status']}</h2>
                <StandartInput
                    className="col-12 col-lg-4 mx-auto mb-3"
                    onHandleChange={onHandleChange}
                    id="status"
                    value={data.status}
                    labelText={lang['order status']}
                    errors={errors}
                />

                <BlueButton
                    onHandleClick={ ()=>get(`/admin/orders/${order.id}/set-status/${data.status}`) }
                >
                    {lang['change order status']}
                </BlueButton>
            </div>

            <div className="text-center my-3">
                <h2>{lang['change order delivery']}</h2>
                <BlueButton
                    onHandleClick={()=>get(`/admin/orders/${order.id}/delivered`)}
                >
                    {lang['order delivered']}
                </BlueButton>
            </div>

            <div className="text-center my-3">
                <h2>{lang['order payment']}</h2>
                <BlueButton onHandleClick={()=>get(`/admin/orders/${order.id}/paid`)} >
                    {lang["pay order"]}!
                </BlueButton>
            </div>

        </AdminLayout>
    );
}
