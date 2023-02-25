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
        test: ["231"],
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
        console.log("selected data:");
        console.log(event.target.options[event.target.selectedIndex].value);


        switch (value) {
            case "post":
                data.test.push(
                    "111"
                );
            case "courier":
                data.test.push(
                    "222"
                );
            break;

            case "storage":
                data.test.push(
                    "333"
                );
            break;
        }

        setData("delivery_method", value);

        setData("test", data.test);

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
        console.log(data);
        // post(route('order-store'));
    }




    return (
        <MainLayout title="Корзина">
        {data.delivery_method}
            <div className="container">
                <h3>Оформление заказа</h3>
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

                        <FloatSelect
                            options={delyveryMethods}
                            className="mb-3 col-12 col-xxl-4"
                            labelText="Способ доставки"
                            selectedOptionIds="Доставка курьером"
                            id="delivery_method"
                            onHandleChange={changeDelivery}
                        />
                    </div>
                    {data.test}

                    <FloatSelect
                        options={paymentMethods}
                        className="mb-3"
                        labelText="Способ оплаты"
                        selectedOptionIds="Оплата картой"
                        id="payment_method"
                        onHandleChange={onHandleChange}
                    />

                    <FloatInput
                        id='phone'
                        labelText='Телефон'
                        className="mb-3"
                        value={data.phone}
                        onHandleChange={onHandleChange}
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
