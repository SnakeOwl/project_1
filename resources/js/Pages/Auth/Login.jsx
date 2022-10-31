import React, { useEffect } from 'react';
import BlueButton from '@/Components/Buttons/BlueButton';
import Checkbox from '@/Components/Inputs/Checkbox';
import MainLayout from '@/Layouts/MainLayout';
import InputError from '@/Components/InputError';
import { Link, useForm } from '@inertiajs/inertia-react';
import FloatInput from '@/Components/Inputs/FloatInput';
import Logo from '@/Components/Logo'

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <MainLayout
            title="Вход">

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className="form-signin">
                <Logo className="d-block text-center h2 mb-2"/>
                <p className="text-center">Пожалуйста войдите</p>
                <form className="" onSubmit={submit}>
                    <div className="mb-3 text-start">
                        <FloatInput
                            type="email"
                            id="email"
                            value={data.email}
                            isFocused={true}
                            handleChange={onHandleChange}
                            labelText="email"
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mb-3 text-start">
                        <FloatInput
                            type="password"
                            id="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            labelText="Пароль"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <p className="text-secondary">administrator@gmail.com  |  administrator</p>
                    <div className="d-flex justify-content-center mb-3">
                        <Checkbox
                            id="remember"
                            labelText="Remember me"
                            value={data.remember}
                            handleChange={onHandleChange}
                            errors={errors}
                        />
                    </div>

                    <div className="text-center">
                        <BlueButton className="w-100 d-block mb-2">
                            Войти
                        </BlueButton>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
