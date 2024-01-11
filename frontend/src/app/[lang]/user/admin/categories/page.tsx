import axiosClient from "@/axios-client";
import ICategory from "@/interfaces/ICategory";
import "server-only"
import CategoriesList from "./_Components/CategoriesList";
import type { Metadata } from 'next'


async function getCategories(): Promise<ICategory[]> {
    const { data } = await axiosClient.get("get/categories");

    return data;
}


export default async function CategoriesPage() {

    const categories = await getCategories();

    return (
        <main>
            <h1>Управление Категориями</h1>

            <CategoriesList categories={categories} />
        </main>
    )
}


export const metadata: Metadata = {
    title: 'Управление категориями',
}

