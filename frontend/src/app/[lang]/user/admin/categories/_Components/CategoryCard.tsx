import ICategory from "@/interfaces/ICategory"
import CardWrapper from "../../_Components/AdminCardWrapper"


export default function CategoryCard({
    category,
    className=""
}: {
    category: ICategory
    className?: string
}) {
    return (
        <CardWrapper
            removeAPIPath={`admin/categories/${category.id}`}
            editLink={`/user/admin/categories/form/${category.id}`}
            className={className}
        >
            <div className="mb-2">{category.name}</div>
            <div className="mb-2">{category.name_en}</div>
            <div className="mb-2">{category.alias}</div>
        </CardWrapper>
    );
}