import { Head, usePage } from '@inertiajs/inertia-react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import FlashMessage from '@/Components/FlashMessage';
import NavigationMenu from './Components/Admin/NavigationMenu';

export default function AdminLayout({children}){
    const {flash} = usePage().props;

    return (
        <>
            <Head title="admin" />
            <Header />
            <main className="container-fluid py-2 px-0">
                <div className="row">
                    <div className="col-12 col-lg-2">
                        <NavigationMenu />
                    </div>

                    <div className="col-12 col-lg-9 px-2">
                        {flash && <FlashMessage message={flash.message} />}

                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
