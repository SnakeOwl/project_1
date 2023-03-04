import { usePage, useForm } from '@inertiajs/inertia-react';
import RedLink from "@/Components/Links/RedLink";
import CurrencySelecter from "@/Components/Widgets/CurrencySelecter";
import React from 'react';
import Logo from '@/Components/Logo';
import UserLinks from './Header/UserLinks';
import LocaleChanger from '@/Components/Widgets/LocaleChanger';

export default function Header(){
    const {lang} = usePage().props;

    return (
        <header key="Header" className="container py-3">

            <div className="row">
                <div className="col-12-d-none col-xxl-4">

                </div>
                <div className="col-xxl-4">
                    <h1 className="text-center">
                        <a href={route('index')}>
                            <Logo/>
                        </a>
                    </h1>

                </div>
                <div className="col-12 col-xxl-4 d-flex align-items-center justify-content-end">
                    <UserLinks className="me-2"/>
                    <CurrencySelecter className="me-2"/>
                    <LocaleChanger className="me-2"/>
                </div>
            </div>
        </header>
    );
}
