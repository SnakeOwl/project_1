import IShape from "@/interfaces/IShape";
import AdminCardWrapper from "../../../../_Components/AdminCardWrapper";


export default function ShapeCard({
    shape,
    categoryID,
    className
}: {
    shape: IShape
    categoryID: string
    className?: string
} ){
    return (
        <AdminCardWrapper
            removeAPIPath={`admin/categories/${categoryID}/shapes/${shape.id}`}
            editLink={`/user/admin/categories/${categoryID}/shapes/form/${shape.id}`}
            className={className}
        >
            <div className="mb-2">{shape.name}</div>
            <div className="mb-2">{shape.name_en}</div>
        </AdminCardWrapper>
    )
}