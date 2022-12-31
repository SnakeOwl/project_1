import MainLayout from '@/Layouts/MainLayout';

export default function Catalog(props) {
    const skus = [];

    props.skus.data.forEach((sku) => {
        skus.push(<SkuCard sku={sku} />);
    });

    return (
        <MainLayout
            flash={props.flash}
            errors={props.errors}
            title={"Личная страница пользователя " + auth.user.name }
            auth={props.auth}
        >

        </MainLayout>
    );
}
