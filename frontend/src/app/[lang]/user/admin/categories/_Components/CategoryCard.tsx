import ICategory from "@/interfaces/ICategory"
import CardWrapper from "../../_Components/AdminCardWrapper"

interface IProps {
    category: ICategory
}

export default function CategoryCard({category}: IProps) {
    return (
        <CardWrapper
            removeAPIPath={`admin/categories/${category.id}`}
            editLink={`user/admin/categories/form/${category.id}`}
        >
            <div className="mb-2">{category.name}</div>
            <div className="mb-2">{category.name_en}</div>
            <div className="mb-2">{category.alias}</div>
        </CardWrapper>
    );
}