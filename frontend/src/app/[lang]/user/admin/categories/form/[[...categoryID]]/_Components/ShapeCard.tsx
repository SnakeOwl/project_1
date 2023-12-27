import IShape from "@/interfaces/IShape";
import AdminCardWrapper from "../../../../_Components/AdminCardWrapper";


interface IProps {
    shape: IShape
    categoryID: string
}

export default function ShapeCard({
    shape,
    categoryID
}: IProps ){
    return (
        <AdminCardWrapper
            removeAPIPath={`admin/categories/${categoryID}/shapes/${shape.id}`}
            editLink={`user/admin/categories/${categoryID}/shapes/form/${shape.id}`}
        >
            <div className="mb-2">{shape.name}</div>
            <div className="mb-2">{shape.name_en}</div>
        </AdminCardWrapper>
    )
}