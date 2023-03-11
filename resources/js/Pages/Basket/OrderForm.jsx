import MainLayout from '@/Layouts/MainLayout';
import RedButton from '@/Components/Buttons/RedButton';
import FloatInput from '@/Components/Inputs/FloatInput';
import FloatSelect from '@/Components/Inputs/FloatSelect';
import { useForm } from '@inertiajs/inertia-react';
import RadioList from './Components/RadioList'

export default function OrderForm(props){
    const {storages, order, lang} = props;
    const {data, setData, errors, post} = useForm({
        name: "",
        phone: "",
        delivery_method: "courier",
        payment_method: "Оплата при получении",
        email: null,
        address: null,
        post_index: null,
        storage_id: null,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const delyveryMethods = [
        {
            id: "courier",
            name: "Доставка курьером",
        },
        {
            id: "post",
            name: "Доставка почтой",
        },
        {
            id: "storage",
            name: "Доставка до точки самовывоза",
        }
    ];

    // при изменении способа доставки нужно изменять видимые поля
    const changeDelivery = (event)=>{
        const value = event.target.options[event.target.selectedIndex].value;

        switch (value) {
            case "post":
                address.parentElement.parentElement.classList.remove("d-none");
                post_index.parentElement.parentElement.classList.remove("d-none");
                storage_id.classList.add("d-none");
            break;

            case "courier":
                address.parentElement.parentElement.classList.remove("d-none");
                post_index.parentElement.parentElement.classList.add("d-none");
                storage_id.classList.add("d-none");
            break;

            case "storage":
                address.parentElement.parentElement.classList.add("d-none");
                post_index.parentElement.parentElement.classList.add("d-none");
                storage_id.classList.remove("d-none");
            break;
        }

        setData("delivery_method", value);
    }

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

    function onHandleSubmit(e){
        e.preventDefault();
        post(route('order-store'));
    }

    return (
        <MainLayout title={lang["checkout"]}>
            <div className="container">
                <h1 className="text-center">{lang['checkout']}</h1>
                <form onSubmit={onHandleSubmit}>
                    <div className="row">
                        <FloatInput
                            id='name'
                            labelText='Ваше Имя'
                            className="mb-3 col-12 col-xxl-4"
                            value={data.name}
                            onHandleChange={onHandleChange}
                        />

                        <FloatInput
                            id='email'
                            labelText='email'
                            className="mb-3 col-12 col-xxl-4"
                            value={data.email}
                            onHandleChange={onHandleChange}
                        />

                        <FloatInput
                            id='phone'
                            labelText='Телефон'
                            className="mb-3 col-12 col-xxl-4"
                            value={data.phone}
                            onHandleChange={onHandleChange}
                        />

                        <FloatSelect
                            options={paymentMethods}
                            className="mb-3 col-12 col-xxl-4"
                            labelText="Способ оплаты"
                            selectedOptionIds="Оплата картой"
                            id="payment_method"
                            onHandleChange={onHandleChange}
                        />
                    </div>

                    <div className="row">
                        <FloatSelect
                            options={delyveryMethods}
                            className="mb-3 col-12 col-xxl-4"
                            labelText="Способ доставки"
                            selectedOptionIds="Доставка курьером"
                            id="delivery_method"
                            onHandleChange={changeDelivery}
                        />

                        <FloatInput
                            id='address'
                            labelText='Адрес'
                            className="mb-3 col-12 col-xxl-4"
                            value={data.address}
                            onHandleChange={onHandleChange}
                        />

                        <FloatInput
                            id='post_index'
                            labelText='Почтовый индекс'
                            className="mb-3 col-12 col-xxl-4 d-none"
                            value={data.post_index}
                            onHandleChange={onHandleChange}
                        />
                    </div>

                    <RadioList
                        id="storage_id"
                        storages={storages}
                        className="d-none"
                        onHandleChange={onHandleChange}
                    />

                    <FloatInput
                        labelText='Сумма для оплаты'
                        className="mb-3"
                        value={order.fullPrice}
                        disabled={1}
                    />
                    <RedButton className="w-100">
                        {lang['submit']}
                    </RedButton>
                </form>
            </div>

        </MainLayout>
    );
}
