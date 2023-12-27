"use client"
import FormWrapper from "@/_Components/FormWrapper";
import { Input } from "@/_Components/Inputs/Input";
import ContextUser from "@/context/User/ContextUser";
import { useContext, useState } from "react";


export default function CheckoutForm({
    dictionary
}: { dictionary: any }) {
    const { stateUser, dispatchUser } = useContext(ContextUser);

    // данные для доп отрисовки частей формы
    const [errors, setErrors] = useState<any>();


    // данные для отправки формы
    const [data, setData] = useState({
        key: stateUser.bkey,

        name: stateUser.user?.name || "",
        email: stateUser.user?.email || "",
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


    return (
        <div>
            <FormWrapper
                data={data}
                submitText={dictionary["submit"]}
                successText={"I can't help falling in love with you ❤"}
                createURL="basket/store-order"
                createMode={true}
                setGeneralErrors={setErrors}

                successCallback = {() => {
                    // чистка данных корзины
                    localStorage.removeItem('basketKey');
                    dispatchUser({
                        type: "SET_BKEY",
                        bkey: undefined
                    });
                }}
            >

                <Input
                    className="mb-4"
                    label={dictionary["name"]}
                    id={"name"}
                    value={data.name}
                    onChange={_setData}
                    error={errors?.name}
                    required
                />

                <Input
                    className="mb-4"
                    label={dictionary["phone"]}
                    id={"phone"}
                    value={data.phone}
                    onChange={_setData}
                    error={errors?.phone}
                    required

                />

                <Input
                    className="mb-4"
                    type="email"
                    label={dictionary["email"]}
                    id={"email"}
                    value={data.email}
                    onChange={_setData}
                    error={errors?.email}
                />

                <Input
                    className="mb-4"
                    label={dictionary["delivery method"]}
                    id={"delivery_method"}
                    value={data.delivery_method}
                    onChange={_setData}
                    error={errors?.email}

                    disabled
                />

                <Input
                    className="mb-4"
                    label={dictionary["payment method"]}
                    id={"payment_method"}
                    value={data.payment_method}
                    onChange={_setData}
                    error={errors?.email}

                    disabled
                />

                <Input
                    className="mb-4"
                    label={dictionary["address"]}
                    id={"address"}
                    value={data.address}
                    onChange={_setData}
                    error={errors?.email}
                />

            </FormWrapper>

        </div>

    )
}