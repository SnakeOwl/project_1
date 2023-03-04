import React, { useEffect } from 'react';
import BlueButton from '@/Components/Buttons/BlueButton';
import MainLayout from '@/Layouts/MainLayout';
import FloatInput from '@/Components/Inputs/FloatInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const onHandeSubmit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <MainLayout>
            <Head title="Register" />

            <form className="col-12 col-xxl-3 mx-auto" onSubmit={onHandeSubmit}>
                <FloatInput
                    id="name"
                    labelText="Имя"
                    value={data.name}
                    autoComplete="email"
                    className="mb-3"
                    isFocused={true}
                    onHandleChange={onHandleChange}
                    required
                />

                <FloatInput
                    id="email"
                    labelText="Email"
                    type="email"
                    className="mb-3"
                    value={data.email}
                    autoComplete="name"
                    onHandleChange={onHandleChange}
                    required
                />

                <FloatInput
                    id="password"
                    labelText="Пароль"
                    type="password"
                    value={data.password}
                    autoComplete="off"
                    className="mb-2"
                    onHandleChange={onHandleChange}
                    required
                />

                <FloatInput
                    labelText="Подтвердите пароль"
                    id="password_confirmation"
                    type="password"
                    className="mb-3"
                    value={data.password_confirmation}
                    autoComplete="off"
                    onHandleChange={onHandleChange}
                    required
                />

                <BlueButton className="mb-3 w-100">
                    Регистрация
                </BlueButton>

                <div className="text-center">
                    <a href={route('login')} className="mb-3">
                        Есть аккаунт?
                    </a>
                </div>

            </form>
        </MainLayout>
    );
}
