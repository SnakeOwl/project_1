"use client"
import { RedButton } from "@/_Components/Buttons/ColoredButtons";
import { Input } from "@/_Components/Inputs/Inputs";
import axiosClient from "@/axios-client";
import ContextUser from "@/context/User/ContextUser";
import { useContext, useState } from "react";


export default function CheckoutForm({
    dictionary
}: { dictionary: any }) {
    const { stateUser, dispatchUser } = useContext(ContextUser);


    // данные для доп отрисовки частей формы
    const [side, setSide] = useState({
        errors: {
            name: undefined,
            email: undefined,
            phone: undefined,
            payment_method: undefined,

            delivery_method: undefined,
            address: undefined,
            post_index: undefined,
            storage_id: undefined,
        },
        critical: false,

        success: false,
        successOrderId: ""
    });


    // данные для отправки формы
    const [data, setData] = useState({
        key: stateUser.bkey,

        name: "",
        email: "",
        phone: "",
        payment_method: "card",

        delivery_method: "courier",
        address: "",
        post_index: undefined,
        storage_id: undefined,
    });


    function _setData(e: React.ChangeEvent<HTMLInputElement>) {
        setData({
            ...data,
            [e.target.id]: e.target.value
        });
    }


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await axiosClient.post("basket/store-order", data)
            .then(({ data }) => {
                setSide({
                    ...side,
                    success: true,
                    successOrderId: data.orderId
                });


                // чистка данных корзины
                localStorage.removeItem('basketKey');
                dispatchUser({
                    type: "SET_BKEY",
                    bkey: undefined
                })
            })
            .catch(({ response }) => {
                console.log(response);

                // 422 - ошибка валидации данных в бэке
                if (response.status === 422) {
                    setSide({
                        ...side,
                        errors: response.data.errors
                    })
                } else {
                    setSide({
                        ...side,
                        critical: true
                    });
                }
            });
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <Input
                    className="mb-4"
                    labelText={dictionary["name"]}
                    id={"name"}
                    value={data.name}
                    onChange={_setData}
                    error={side.errors["name"]}
                    required
                />

                <Input
                    className="mb-4"
                    labelText={dictionary["phone"]}
                    id={"phone"}
                    value={data.phone}
                    onChange={_setData}
                    error={side.errors["phone"]}
                    required

                />

                <Input
                    className="mb-4"
                    type="email"
                    labelText={dictionary["email"]}
                    id={"email"}
                    value={data.email}
                    onChange={_setData}
                    error={side.errors["email"]}
                />

                <Input
                    className="mb-4"
                    labelText={dictionary["delivery method"]}
                    id={"delivery_method"}
                    value={data.delivery_method}
                    onChange={_setData}
                    error={side.errors["delivery_method"]}

                    disabled
                />

                <Input
                    className="mb-4"
                    labelText={dictionary["payment method"]}
                    id={"payment_method"}
                    value={data.payment_method}
                    onChange={_setData}
                    error={side.errors["payment_method"]}

                    disabled
                />

                <Input
                    className="mb-4"
                    labelText={dictionary["address"]}
                    id={"address"}
                    value={data.address}
                    onChange={_setData}
                    error={side.errors["address"]}
                />

                {side.success !== false ?
                    <p className="py-4 mt-3 text-center border-2 border-green-400 text-green-500 radius-2 rounded-xl">
                        {dictionary["thank for order"]}
                        <br />
                        {`${dictionary["your order's number is"]} ${side.successOrderId}`}
                    </p>
                    :
                    <RedButton className="w-full py-4" >
                        {dictionary["submit"]}
                    </RedButton>
                }
            </form>

            {side.critical &&
                <p className="ring-red-600 ">{dictionary["critical error"]}</p>
            }
        </div>

    )
}