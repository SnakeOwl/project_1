import MainLayout from '@/Layouts/MainLayout'
import {RedButton} from '@/Components/Buttons'
import FloatInput from '@/Components/Inputs/FloatInput'
import FloatSelect from '@/Components/Inputs/FloatSelect'
import { useForm } from '@inertiajs/inertia-react'
import RadioList from './Components/RadioList'

export default function OrderForm(props){
    const {storages, order, lang, currentLocale} = props;
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

    // по хорошему всё это можно в базу перенести
    const delyveryMethods = [
        {
            id: "courier",
            name: "Доставка курьером",
            name_en: "Courier delivery",
        },
        {
            id: "post",
            name: "Доставка почтой",
            name_en: "Post delivery",
        },
        {
            id: "storage",
            name: "Доставка до точки самовывоза",
            name_en: "Storage delivery",
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
            id: "cashe",
            name: "Оплата при получении",
            name_en: "Payment upon receipt",
        },
        {
            id: "card",
            name: "Оплата картой",
            name_en: "Card pay",
        },

    ];

    function onHandleSubmit(e){
        e.preventDefault();
        post('/basket/order-store');
    }

    return (
        <MainLayout title={lang["checkout"]}>
            <div className="container">
                <h1 className="text-center">{lang['checkout']}</h1>
                <form onSubmit={onHandleSubmit}>
                    <div className="row">
                        <div className="col-12 col-lg-4 mx-auto">
                            <FloatInput
                                id='name'
                                labelText={lang['name']}
                                className="mb-3"
                                value={data.name}
                                onHandleChange={onHandleChange}
                            />

                            <FloatInput
                                id='email'
                                labelText='email'
                                className="mb-3"
                                value={data.email}
                                onHandleChange={onHandleChange}
                            />

                            <FloatInput
                                id='phone'
                                labelText={lang["phone"]}
                                className="mb-3"
                                value={data.phone}
                                onHandleChange={onHandleChange}
                            />

                            <FloatSelect
                                options={paymentMethods}
                                className="mb-3"
                                labelText={lang["payment method"]}
                                selectedOptionIds="card"
                                id="payment_method"
                                onHandleChange={onHandleChange}
                            />

                            <FloatSelect
                                options={delyveryMethods}
                                className="mb-3"
                                labelText={lang["delivery method"]}
                                selectedOptionIds="courier"
                                id="delivery_method"
                                onHandleChange={changeDelivery}
                            />

                            <FloatInput
                                id='address'
                                labelText={lang["address"]}
                                className="mb-3"
                                value={data.address}
                                onHandleChange={onHandleChange}
                            />

                            <FloatInput
                                id='post_index'
                                labelText={lang['post index']}
                                className="mb-3 d-none"
                                value={data.post_index}
                                onHandleChange={onHandleChange}
                            />

                            <RadioList
                                id="storage_id"
                                storages={storages}
                                className="d-none"
                                onHandleChange={onHandleChange}
                            />

                            <FloatInput
                                labelText={lang["price"]}
                                className="mb-3"
                                value={order.fullPrice}
                                disabled={1}
                            />
                            <RedButton className="w-100">
                                {lang['submit']}
                            </RedButton>
                        </div>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
