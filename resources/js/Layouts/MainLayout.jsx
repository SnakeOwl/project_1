import { usePage } from '@inertiajs/inertia-react';
import { Head } from '@inertiajs/inertia-react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import FlashMessage from '@/Components/FlashMessage';

export default function MainLayout({children}){
    const {flash} = usePage().props;
    return (
        <>
            <Header />
            <main className="container-fluid py-4 px-0">
                {flash && <FlashMessage message={flash.message} />}
                {children}
            </main>
            <Footer />
        </>
    );
}
