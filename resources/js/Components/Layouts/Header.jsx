import React from 'react';
import Logo from '@/Components/Logo';
import UserLinks from '@/Components/Layouts/Header/UserLinks';



export default function Header({auth}){


    return (
        <header key="Header" className="container py-3">
            <div className="row d-flex">
                <div className="col">
                    <a href={route('index')}>
                        <Logo className="h1"/>
                    </a>
                </div>

                <div className="col">
                    <a href={route('catalog')}>Каталог</a>
                </div>

                <div className="col">
                    <UserLinks auth={auth} />
                </div>
            </div>
        </header>
    );
}
