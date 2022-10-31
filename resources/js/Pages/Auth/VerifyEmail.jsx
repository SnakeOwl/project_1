import React from 'react';
import BlueButton from '@/Components/Buttons/BlueButton';
import MainLayout from '@/Layouts/MainLayout';
import { Head, useForm } from '@inertiajs/inertia-react';

export default function VerifyEmail({ status }) {
    const { post } = useForm();

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <MainLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                link we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <BlueButton>Resend Verification Email</BlueButton>

                    <a
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                    >
                        Log Out
                    </a>
                </div>
            </form>
        </MainLayout>
    );
}
