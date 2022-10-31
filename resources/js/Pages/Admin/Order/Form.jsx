import AdminLayout from '@/Layouts/AdminLayout';
import BlueButton from '@/Components/Buttons/BlueButton'
import Checkbox from '@/Components/Inputs/Checkbox'
import StandartInput from '@/Components/Inputs/StandartInput'
import { useForm } from '@inertiajs/inertia-react';


export default function Form(props){
    const order = props.order;
    const { data, setData, post, errors, reset } = useForm({
        payment_status: order? order.payment_status: "",
        status:         order? order.status: "",
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

    function handleOrderDeliveredSubmit(e){
        e.preventDefault();

        post(route('order-deliver', order.id));
        setData('status', 'Заказ доставлен')
    }

    function handleOrderSetStatusSubmit(e){
        e.preventDefault();

        post(route('order-set-status', order.id));
    }

    function handleOrderPaidSubmit(e){
        e.preventDefault();

        post(route('order-set-payment-status', order.id));
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    return (
        <AdminLayout
            auth={props.auth}
        >
            <h1>Обработка заказа</h1>
            <h3>Параметры заказа</h3>
            <table className="table table-striped">
                <tbody>
                    {fields}
                </tbody>
            </table>

            <h3>Закрепление курьера</h3>
            <p className="text-danger">Нужно переделать весь механизм курьеров чтобы по нормальному уже с ними работать</p>

            <h3>Изменение статуса заказа</h3>
            <form className="col-6 mb-3" onSubmit={handleOrderSetStatusSubmit}>
                <StandartInput
                    handleChange={onHandleChange}
                    id="status"
                    value={data.status}
                    labelText="Статус заказа"
                    errors={errors}
                />
                <BlueButton>Изменить статус</BlueButton>
            </form>

            <h3>Изменение статуса доставки заказа</h3>
            <form className="mb-3" onSubmit={handleOrderDeliveredSubmit}>
                <BlueButton>Заказ доставлен</BlueButton>
            </form>

            <h3>Оплата заказа</h3>
            <form className="mb-3" onSubmit={handleOrderPaidSubmit}>
                <Checkbox handleChange={onHandleChange} id="payment_status" value={data.payment_status} checked={data.payment_status && "checked"} labelText="Статус оплаты заказа"/>
                <BlueButton>Изменить статус оплаты</BlueButton>
            </form>
        </AdminLayout>
    );
}
