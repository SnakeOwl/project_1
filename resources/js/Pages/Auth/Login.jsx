import { usePage, useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';
import BlueButton from '@/Components/Buttons/BlueButton';
import GreenButton from '@/Components/Buttons/GreenButton';
import Link from '@/Components/Links/Link';
import Checkbox from '@/Components/Inputs/Checkbox';
import MainLayout from '@/Layouts/MainLayout';
import InputError from '@/Components/InputError';
import FloatInput from '@/Components/Inputs/FloatInput';
import Logo from '@/Components/Logo'

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, errors, reset } = useForm({
        email: '',
        password: '',
        remember: 1,
    });

    const {lang} = usePage().props;

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        console.log(event.target.name);
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const onHandleSubmit = (event) => {
        event.preventDefault();

        post(route('login'));
    };

// функция для отладки, в продакшне удалить!!!
    const loginAdmin = () => {
        data.email='administrator@gmail.com';
        data.password='administrator';
        post(route('login'));
    }

    return (
        <MainLayout title={lang['login form title']}>
            <div className="col-12 col-xxl-2 mx-auto">
                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                <form  onSubmit={onHandleSubmit}>
                    <p className="h3 mb-2 text-center">{lang["sign in"]}</p>

                    <FloatInput
                        id="email"
                        type="email"
                        value={data.email}
                        className="mb-3"
                        isFocused={true}
                        onHandleChange={onHandleChange}
                        labelText="email"
                    />

                    <FloatInput
                        id="password"
                        type="password"
                        value={data.password}
                        className="mb-1"
                        onHandleChange={onHandleChange}
                        labelText={lang["password"]}
                    />

                    <div className="d-flex justify-content-center mb-2">
                        <Checkbox
                            id="remember"
                            labelText="Remember me"
                            value={data.remember}
                            onHandleChange={onHandleChange}
                        />
                    </div>

                    <div className="text-center">
                        <BlueButton className="w-100 mb-2">
                            {lang['log in']}
                        </BlueButton>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="w-100 mb-3"
                            >
                                {lang['ForgotPassword']}

                            </Link>
                        )}

                        <div className="mt-3">
                            {lang['newUser']} <br/>
                            <Link className={"h5"} href={route('register')}>{lang['goRegister']}</Link>
                        </div>
                    </div>
                </form>

                <GreenButton
                    className="w-100 mt-3"
                    onHandleClick={loginAdmin}>
                    Войти как администратор
                </GreenButton>
            </div>
        </MainLayout>
    );
}
