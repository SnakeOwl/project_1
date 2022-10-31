import Header from '@/Components/Layouts/Header';
import Footer from '@/Components/Layouts/Footer';
import FlashMessage from '@/Components/Layouts/FlashMessage';
import { Head } from '@inertiajs/inertia-react';
import NavigationMenu from '@/Components/Layouts/Admin/NavigationMenu';

export default function AdminLayout({children, flash=undefined, auth=undefined}){
    return (
        <>
            <Head title="MiceMice admin" />
            <Header auth={auth}/>
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
