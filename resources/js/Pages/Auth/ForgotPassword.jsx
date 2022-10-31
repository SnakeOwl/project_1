import React from 'react';
import BlueButton from '@/Components/Buttons/BlueButton';
import MainLayout from '@/Layouts/MainLayout';
import StandartInput from '@/Components/Inputs/StandartInput';
import { Head, useForm } from '@inertiajs/inertia-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <MainLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-500 leading-normal">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <StandartInput
                    id="email"
                    value={data.email}
                    labelText="Email"
                    isFocused={true}
                    handleChange={onHandleChange}
                    errors={errors}
                />

                <div className="flex items-center justify-end mt-4">
                    <BlueButton>
                        Email Password Reset Link
                    </BlueButton>
                </div>
            </form>
        </MainLayout>
    );
}
