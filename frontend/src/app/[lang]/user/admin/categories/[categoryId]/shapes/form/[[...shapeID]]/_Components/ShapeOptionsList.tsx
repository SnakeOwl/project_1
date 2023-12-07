import BigPlusLink from "@/app/[lang]/user/_Components/BigPlusLink"
import IShape from "@/interfaces/IShape"
import OptionCard from "./OptionCard"

interface IProps {
    shape: IShape
}

export default function ShapeOptionsList({shape}: IProps) {
    return(
        <div className="flex space-x-4">
            <BigPlusLink  href={`user/admin/categories/shapes/${shape.id}/options/form`} />

            { shape.options?.map(op=>{return <OptionCard shapeID={shape.id} option={op} /> }) }
        </div>
    )
}