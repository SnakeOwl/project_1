import MainLayout from '@/Layouts/MainLayout';
import RedButton from '@/Components/Buttons/RedButton';
import FloatInput from '@/Components/Inputs/FloatInput';
import FloatSelect from '@/Components/Inputs/FloatSelect';
import { useForm } from '@inertiajs/inertia-react';
import RadioList from './Components/RadioList'

export default function OrderForm(props){
    const storages = props.storages;
    const order = props.order;

    const {data, setData, errors, post} = useForm({
        name: "",
        phone: "",
        delivery_method: "Доставка курьером",
        payment_method: "Оплата при получении",
        email: null,
        address: null,
        post_index: null,
        storage_id: null,
    });

    const delyveryMethods = [
        {
            id: "Доставка курьером",
            name: "Доставка курьером",
        },
        {
            id: "Доставка почтой",
            name: "Доставка почтой",
        },
        {
            id: "Доставка до точки самовывоза",
            name: "Доставка до точки самовывоза",
        }
    ];

    const paymentMethods = [
        {
            id: "Оплата при получении",
            name: "Оплата при получении",
        },
        {
            id: "Оплата картой",
            name: "Оплата картой",
        },

    ];

    function recreateDeliveryInputs(value){
        if(value == "Доставка курьером"){
            address.classList.remove('d-none');
            post_index.classList.add('d-none');
            storage_id.classList.add('d-none');
        }
        else if (value == "Доставка почтой"){
            address.classList.remove('d-none');
            post_index.classList.remove('d-none');
            storage_id.classList.add('d-none');
        }
        else if (value == "Доставка до точки самовывоза"){
            address.classList.add('d-none');
            post_index.classList.add('d-none');
            storage_id.classList.remove('d-none');
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        post(route('order-store'));
        // e.target.reset();
    }


    const onHandleChange = (event) => {
        // при изменении способа доставки нужно изменять видимые поля
        if(event.target.name == "delivery_method")
            recreateDeliveryInputs(event.target.value);

        setData(event.target.name, event.target.value);
    };

    return (
        <MainLayout
        flash={props.flash}
        errors={props.errors}
        title="Корзина"
        auth={props.auth}
        >
            <div className="container">
                <h3>Оформление заказа</h3>
                <form onSubmit={handleSubmit}>
                    <FloatInput
                        id='name'
                        labelText='Ваше Имя'
                        className="mb-3"
                        value={data.name}
                        handleChange={onHandleChange}
                        errors={props.errors}
                    />

                    <FloatInput
                        id='email'
                        labelText='email'
                        className="mb-3"
                        value={data.email}
                        handleChange={onHandleChange}
                        errors={props.errors}
                    />

                    <FloatSelect
                        options={delyveryMethods}
                        className="mb-3"
                        labelText="Способ доставки"
                        selectedOptionIds="Доставка курьером"
                        id="delivery_method"
                        handleChange={onHandleChange}
                    />

                    <FloatInput
                        id='address'
                        labelText='Адрес'
                        className="mb-3"
                        value={data.address}
                        handleChange={onHandleChange}
                        errors={props.errors}
                    />

                    <FloatInput
                        id='post_index'
                        labelText='Почтовый индекс'
                        className="mb-3"
                        inputClassName="d-none"
                        value={data.post_index}
                        handleChange={onHandleChange}
                        errors={props.errors}
                    />

                    <RadioList
                        id="storage_id"
                        classNameContainer="d-none"
                        storages={storages}
                        handleChange={onHandleChange}
                    />

                    <FloatSelect
                        options={paymentMethods}
                        className="mb-3"
                        labelText="Способ оплаты"
                        selectedOptionIds="Оплата картой"
                        id="payment_method"
                        handleChange={onHandleChange}
                    />

                    <FloatInput
                        id='phone'
                        labelText='Телефон'
                        className="mb-3"
                        value={data.phone}
                        handleChange={onHandleChange}
                        errors={props.errors}
                    />

                    <FloatInput
                        labelText='Сумма для оплаты'
                        className="mb-3"
                        value={order.fullPrice}
                        disabled={1}
                    />
                    <p className="text-center">
                    <RedButton>
                        Оформить
                    </RedButton>
                    </p>
                </form>
            </div>

        </MainLayout>
    );
}
