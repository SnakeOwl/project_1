import Layout from './Layout';
import LeftMenu from './Components/UserCabinet/LeftMenu';

export default function UserCabinetLayout({
    children,
    title
}){
    return (
        <Layout
            className={"container"}
            title={title}
        >
            <div className="row">
                <div className="col-12 col-lg-2 mb-3">
                    <LeftMenu />
                </div>
                <div className="col-12 col-lg-10 overflow-x-auto">
                    {children}
                </div>
            </div>
        </Layout>
    );
}
