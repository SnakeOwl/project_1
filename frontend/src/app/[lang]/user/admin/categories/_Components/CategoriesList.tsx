import ICategory from "@/interfaces/ICategory";
import BigPlusLink from "../../../_Components/BigPlusLink";
import CategoryCard from "./CategoryCard";

interface IProps {
    categories: ICategory[]
}

export default function CategoriesList({
    categories
}: IProps) {

    return (
        <div className="flex space-x-4">
            <div className="2xl:w-1/6">
                <BigPlusLink href="/user/admin/categories/form" />
            </div>

            {categories.map(cat => {
                return <div className="2xl:w-1/6"> <CategoryCard category={cat} /> </div>
            })
            }
        </div>
    )
}