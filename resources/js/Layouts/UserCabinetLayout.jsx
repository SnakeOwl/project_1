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
                <div className="col-2">
                    <LeftMenu />
                </div>
                <div className="col-10">
                    {children}
                </div>
            </div>
        </Layout>
    );
}
