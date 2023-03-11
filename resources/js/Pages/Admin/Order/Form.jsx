import { Inertia } from '@inertiajs/inertia'
import AdminLayout from '@/Layouts/AdminLayout';
import BlueButton from '@/Components/Buttons/BlueButton'
import StandartInput from '@/Components/Inputs/StandartInput'
import { useForm } from '@inertiajs/inertia-react';

export default function Form(props){
    const {lang, order} = props;

    const { data, setData, post, get, errors} = useForm({
        status: order? order.status: "",
    });

    const fields = [];
    for (let prop in order){
         fields.push(
             <tr>
                 <td>{prop}:</td>
                 <td>{order[prop]}</td>
             </tr>
         );
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    return (
        <AdminLayout title={lang["order form"]}>

            <table className="table table-striped">
                <tbody>
                    {fields}
                </tbody>
            </table>

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
                    onHandleClick={ ()=>get(route('set-order-status', [order, data.status])) }
                >
                    {lang['change order status']}
                </BlueButton>
            </div>

            <div className="text-center my-3">
                <h2>{lang['change order delivery']}</h2>
                <BlueButton
                    onHandleClick={()=>get(route('order-delivered', order))}
                >
                    {lang['order delivered']}
                </BlueButton>
            </div>

            <div className="text-center my-3">
                <h2>{lang['order payment']}</h2>
                <BlueButton onHandleClick={()=>get(route('order-paid', order))} >
                    {lang["pay order"]}!
                </BlueButton>
            </div>

        </AdminLayout>
    );
}
