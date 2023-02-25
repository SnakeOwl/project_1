import { usePage, useForm } from '@inertiajs/inertia-react';

import Link from "@/Components/Links/Link";
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

            <div className="row d-flex">
                <div className="col-12 col-lg-3">
                    <a href={route('index')}>
                        <Logo className="h1"/>
                    </a>
                </div>

                <div className="col-12 col-lg-5 d-flex align-items-center justify-content-evenly">
                    <Link href={route('catalog')}>
                        {lang['catalog']}
                    </Link>
                    <RedLink
                        className="text-red rounded"
                        href={route('basket')}
                    >
                        <i class="bi bi-bag-fill"></i>
                    </RedLink>
                    <LocaleChanger />
                    <CurrencySelecter />

                </div>

                <div className="col-12 col-lg-4">
                    <UserLinks />
                </div>

            </div>
        </header>
    );
}
