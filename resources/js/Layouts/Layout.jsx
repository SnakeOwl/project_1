import { Head, usePage } from '@inertiajs/inertia-react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import FlashMessage from '@/Components/Widgets/FlashMessage';

export default function Layout({
    children,
    className="",
    title="Mono Polo"
})
{
    return (
        <>
            <Head title={title} />
            <Header />

            <main className={"py-4 " + className}>
                <FlashMessage />
                {children}
            </main>

            <Footer />
        </>
    );
}
