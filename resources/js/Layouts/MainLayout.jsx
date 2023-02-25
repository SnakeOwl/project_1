import Layout from './Layout';

export default function MainLayout({
    children,
    title
}){
    return (
        <Layout
            className={"container-fluid"}
            title={title}
        >
            {children}
        </Layout>
    );
}
