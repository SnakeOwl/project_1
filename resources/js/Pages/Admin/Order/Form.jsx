import AdminLayout from '@/Layouts/AdminLayout';
import BlueButton from '@/Components/Buttons/BlueButton'
import Checkbox from '@/Components/Inputs/Checkbox'
import StandartInput from '@/Components/Inputs/StandartInput'
import { useForm } from '@inertiajs/inertia-react';

export default function Form(props){
    const order = props.order;
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
            <div className="col-6 mb-3">
                <StandartInput
                    className="col-6"
                    handleChange={onHandleChange}
                    id="status"
                    value={data.status}
                    labelText="Статус заказа"
                    errors={errors}
                />

                <BlueButton
                    className="mb-3"
                    handleClick={ () => get(route('set-order-status', [order, data.status])) }
                >
                    Изменить статус
                </BlueButton>
            </div>

            <h3>Изменение статуса доставки заказа</h3>
                <BlueButton
                    handleClick={() => get(route('order-delivered', order))}
                >
                    Заказ доставлен
                </BlueButton>

            <h3>Оплата заказа</h3>
                <BlueButton
                    handleClick={ () => get(route('order-paid', order))}
                >
                    Оплатить товар (установить статус на "Оплачено")!
                </BlueButton>
        </AdminLayout>
    );
}
