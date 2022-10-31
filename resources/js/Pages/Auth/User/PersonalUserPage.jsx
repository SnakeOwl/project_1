import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import SkuCard from '@/Components/Catalog/SkuCard';
import Filter from '@/Components/Catalog/Filter';
import Searcher from '@/Components/Catalog/Searcher';


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
