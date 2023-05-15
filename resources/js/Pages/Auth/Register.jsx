import React, { useEffect } from 'react';
import {BlueButton} from '@/Components/Buttons';
import MainLayout from '@/Layouts/MainLayout';
import FloatInput from '@/Components/Inputs/FloatInput';
import { Link, useForm } from '@inertiajs/inertia-react';

export default function Register(props) {
    const {lang} = props;
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
        <MainLayout title={lang["register"]}>
            <h1 className="text-center">{lang["registration"]}</h1>
            <form className="col-12 col-xxl-3 mx-auto" onSubmit={onHandeSubmit}>
                <FloatInput
                    id="name"
                    labelText={lang["name"]}
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
                    labelText={lang["password"]}
                    type="password"
                    value={data.password}
                    autoComplete="off"
                    className="mb-2"
                    onHandleChange={onHandleChange}
                    required
                />

                <FloatInput
                    labelText={lang["confirm password"]}
                    id="password_confirmation"
                    type="password"
                    className="mb-3"
                    value={data.password_confirmation}
                    autoComplete="off"
                    onHandleChange={onHandleChange}
                    required
                />

                <BlueButton className="mb-3 w-100">
                    {lang['submit']}
                </BlueButton>

                <div className="text-center">
                    <Link href={route('login')} className="mb-3">
                        {lang['has account']}?
                    </Link>
                </div>
            </form>
        </MainLayout>
    );
}
