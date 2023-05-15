import React, { useEffect } from 'react';
import {BlueButton} from '@/Components/Buttons';
import MainLayout from '@/Layouts/MainLayout';
import StandartInput from '@/Components/Inputs/StandartInput';
import { Head, useForm } from '@inertiajs/inertia-react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.update'));
    };

    return (
        <MainLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <StandartInput
                    id="email"
                    type="email"
                    labelText="Email"
                    value={data.email}
                    autoComplete="username"
                    handleChange={onHandleChange}
                    errors={errors}
                />

                <StandartInput
                    id="password"
                    type="password"
                    labelText="Пароль"
                    value={data.password}
                    handleChange={onHandleChange}
                    errors={errors}
                />

                <StandartInput
                    id="password_confirmation"
                    type="password"
                    labelText="Подтвердите пароль"
                    value={data.password_confirmation}
                    handleChange={onHandleChange}
                    errors={errors}
                />


                <div className="flex items-center justify-end">
                    <BlueButton>
                        Сбросить пароль
                    </BlueButton>
                </div>
            </form>
        </MainLayout>
    );
}
