import {usePage} from '@inertiajs/inertia-react';
import Layout from './Layout';
import BasketButton from '@/Components/Widgets/BasketButton';

export default function MainLayout({
    children,
    title
}){
    const {basketIsEmpty} = usePage().props;
    return (
        <Layout
            className="container-fluid"
            title={title}
        >
            {children}
            
            {(!basketIsEmpty && basketIsEmpty !=null) &&
                <BasketButton className="position-fixed bottom-0 end-0 me-4 mb-4">
                    <i class="bi bi-cart-fill"></i>
                </BasketButton>
            }
        </Layout>
    );
}
