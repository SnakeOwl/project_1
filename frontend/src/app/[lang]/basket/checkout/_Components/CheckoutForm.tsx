"use client"
import FormWrapper from "@/_Components/FormWrapper";
import { Input } from "@/_Components/Inputs/Input";
import Basket from "@/classes/Basket";
import ContextUser from "@/context/User/ContextUser";
import { useContext, useState } from "react";


export default function CheckoutForm({
    dictionary
}: { dictionary: any }) {

    const { stateUser, dispatchUser } = useContext(ContextUser);
    const [errors, setErrors] = useState<any>();
    const basket = new Basket();

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
                    basket.eraseData();
                }}
            >

                <Input
                    className="mb-4"
                    label={dictionary["name"]}
                    value={data.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                        setData({
                            ...data,
                            name: e.target.value
                        });
                    }}
                    error={errors?.name}
                    required
                />

                <Input
                    className="mb-4"
                    label={dictionary["phone"]}
                    value={data.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                        setData({
                            ...data,
                            phone: e.target.value
                        });
                    }}
                    error={errors?.phone}
                    required

                />

                <Input
                    className="mb-4"
                    type="email"
                    label={dictionary["email"]}
                    value={data.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                        setData({
                            ...data,
                            email: e.target.value
                        });
                    }}
                    error={errors?.email}
                />

                <Input
                    className="mb-4"
                    label={dictionary["delivery method"]}
                    value={data.delivery_method}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                        setData({
                            ...data,
                            delivery_method: e.target.value
                        });
                    }}
                    error={errors?.email}

                    disabled
                />

                <Input
                    className="mb-4"
                    label={dictionary["payment method"]}
                    value={data.payment_method}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                        setData({
                            ...data,
                            payment_method: e.target.value
                        });
                    }}
                    error={errors?.email}

                    disabled
                />

                <Input
                    className="mb-4"
                    label={dictionary["address"]}
                    value={data.address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                        setData({
                            ...data,
                            address: e.target.value
                        });
                    }}
                    error={errors?.email}
                />

            </FormWrapper>
        </div>
    )
}