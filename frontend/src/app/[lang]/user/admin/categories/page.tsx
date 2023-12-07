import axiosClient from "@/axios-client";
import ICategory from "@/interfaces/ICategory";
import "server-only"
import CategoriesList from "./_Components/CategoriesList";


async function getCategories(): Promise<ICategory[]>{
    const response = await axiosClient.get("get/categories");
    const {data} = response;

    return data;
}


export default async function CategoriesPage(){

    const categories = await getCategories();

    return (
        <main>
            <h1>Управление Категориями</h1>

            <CategoriesList categories={categories} />
        </main>
    )
}


// metadata. server only!
export async function generateMetadata() {
    return {
        title: "Управление категориями",
    }
}
