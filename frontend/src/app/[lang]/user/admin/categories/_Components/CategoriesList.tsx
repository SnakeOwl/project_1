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
        <div className="flex flex-wrap gap-2 justify-around">
            <div className="2xl:w-1/6">
                <BigPlusLink href="/user/admin/categories/form" />
            </div>

            {categories.map(cat => 
                <CategoryCard 
                    key={cat.id}
                    className="w-full 2xl:w-1/6" 
                    category={cat} />
            )
            }
        </div>
    )
}