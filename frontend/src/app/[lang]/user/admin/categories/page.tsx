import "server-only"
import CategoriesList from "./_Components/CategoriesList";
import type { Metadata } from 'next'
import PageRefresher from "../../_Components/PageRefresher";
import getCategories from "@/utils/getCategories";


export default async function CategoriesPage() {

    const categories = await getCategories({ cache: 'no-store' });

    return (
        <main>
            <h1>Управление Категориями</h1>

            <CategoriesList categories={categories} />

            <PageRefresher />
        </main>
    )
}


export const metadata: Metadata = {
    title: 'Управление категориями',
}

