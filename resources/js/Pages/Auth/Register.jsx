import React, { useEffect } from 'react';
import BlueButton from '@/Components/Buttons/BlueButton';
import MainLayout from '@/Layouts/MainLayout';
import StandartInput from '@/Components/Inputs/StandartInput';
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

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <MainLayout>
            <Head title="Register" />

            <form className="form-signin" onSubmit={submit}>
                <StandartInput
                    id="name"
                    labelText="Имя"
                    value={data.name}
                    autoComplete="email"
                    isFocused={true}
                    handleChange={onHandleChange}
                    errors={errors}
                    required
                />

                <StandartInput
                    id="email"
                    labelText="Email"
                    type="email"
                    value={data.email}
                    autoComplete="name"
                    handleChange={onHandleChange}
                    errors={errors}
                    required
                />

                <StandartInput
                    id="password"
                    labelText="Пароль"
                    type="password"
                    value={data.password}
                    autoComplete="off"
                    handleChange={onHandleChange}
                    errors={errors}
                    required
                />

                <StandartInput
                    id="password_confirmation"
                    labelText="Подтвердите пароль"
                    type="password"
                    value={data.password_confirmation}
                    autoComplete="off"
                    handleChange={onHandleChange}
                    errors={errors}
                    required
                />

                <div className="text-center">
                    <a href={route('login')} className="mb-3">
                        Already registered?
                    </a>

                    <BlueButton>Регистрация</BlueButton>
                </div>
            </form>
        </MainLayout>
    );
}
