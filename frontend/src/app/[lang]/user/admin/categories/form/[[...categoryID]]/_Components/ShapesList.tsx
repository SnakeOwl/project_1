import BigPlusLink from "@/app/[lang]/user/_Components/BigPlusLink"
import IShape from "@/interfaces/IShape"
import ShapeCard from "./ShapeCard"

interface IProps {
    categoryID: string
    shapes?: IShape[]
}

export default function ShapesList({categoryID, shapes}: IProps){
    return (
        <div className="flex space-x-4 flex-wrap">
        	<div className="2xl:w-1/6">
            <BigPlusLink href={`user/admin/categories/${categoryID}/shapes/form`} />
</div>
            {shapes?.map(shape=>{
                return <ShapeCard shape={shape} categoryID={categoryID} />
            })
            }
        </div>
    )
}
