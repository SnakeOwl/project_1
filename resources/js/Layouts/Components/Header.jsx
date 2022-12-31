import React from 'react';
import Logo from '@/Components/Logo';
import UserLinks from './Header/UserLinks';
import LocaleChanger from '@/Components/LocaleChanger';

export default function Header(){
    return (
        <header key="Header" className="container py-3">
            <div className="row d-flex">
                <div className="col-12 col-lg-3">
                    <a href={route('index')}>
                        <Logo className="h1"/>
                    </a>
                </div>

                <div className="col-12 col-lg-5 d-flex align-items-center justify-content-evenly">
                    <a href={route('catalog')}>Каталог</a>
                    <a href={route('basket')}>Корзина</a>
                    <LocaleChanger />
                </div>

                <div className="col-12 col-lg-4">
                    <UserLinks />
                </div>
            </div>
        </header>
    );
}
