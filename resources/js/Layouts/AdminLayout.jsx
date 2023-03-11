import MainLayout from './MainLayout';
import NavigationMenu from './Components/Admin/NavigationMenu';

export default function AdminLayout({
    children,
    title="Management"
}){

    return (
        <MainLayout title={title} >
            <div className="row">
                <div className="col-12 col-lg-2">
                    <NavigationMenu />
                </div>

                <div className="col-12 col-lg-10 px-2">
                    <h1 className="text-center">{title}</h1>
                    {children}
                </div>
            </div>
        </MainLayout>
    );
}
