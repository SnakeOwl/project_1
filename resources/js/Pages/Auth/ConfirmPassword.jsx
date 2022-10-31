import React, { useEffect } from 'react';
import BlueButton from '@/Components/Buttons/BlueButton';
import MainLayout from '@/Layouts/MainLayout';
import StandartInput from '@/Components/Inputs/StandartInput';
import { Head, useForm } from '@inertiajs/inertia-react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <MainLayout>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-gray-600">
                This is a secure area of the application. Please confirm your password before continuing.
            </div>

            <form onSubmit={submit}>
                <StandartInput
                    type="password"
                    id="password"
                    value={data.password}
                    errors={errors}
                    handleChange={onHandleChange}
                    isFocused={true}
                    labelText="Пароль"
                />

                <div className="flex items-center justify-end mt-4">
                    <BlueButton processing={processing}>
                        Confirm
                    </BlueButton>
                </div>
            </form>
        </MainLayout>
    );
}
