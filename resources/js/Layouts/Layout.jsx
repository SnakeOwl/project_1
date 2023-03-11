import { Head, usePage } from '@inertiajs/inertia-react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import FlashMessage from '@/Components/Widgets/FlashMessage';

export default function Layout({
    children,
    className="",
    title="Shower"
})
{
    return (
        <>
            <Head title={title} />
            <Header />

            <main className={className}>
                <FlashMessage />
                {children}
            </main>

            <Footer />
        </>
    );
}
