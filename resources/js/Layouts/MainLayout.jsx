import React from 'react';
import Header from '@/Components/Layouts/Header';
import Footer from '@/Components/Layouts/Footer';
import FlashMessage from '@/Components/Layouts/FlashMessage';
import { Head } from '@inertiajs/inertia-react';

export default function MainLayout({children, flash=undefined, auth=undefined}){
    return (
        <>
            <Header auth={auth}/>
            <main className="container-fluid py-4 px-0">
                {flash && <FlashMessage message={flash.message} />}
                {children}
            </main>
            <Footer />
        </>
    );
}
