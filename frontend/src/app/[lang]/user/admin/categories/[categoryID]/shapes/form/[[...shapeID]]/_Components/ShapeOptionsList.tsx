import BigPlusLink from "@/app/[lang]/user/_Components/BigPlusLink"
import IShape from "@/interfaces/IShape"
import OptionCard from "./OptionCard"


export default function ShapeOptionsList({shape}: {shape: IShape}) {
    return(
        <div className="flex flex-wrap gap-2">
            <div className="2xl:w-1/6">
                <BigPlusLink  href={`user/admin/categories/shapes/${shape.id}/options/form`} />
            </div>

            { shape.shape_options?.map(op => 
                <div className="2xl:w-1/6">
                    <OptionCard shapeID={shape.id} option={op} /> 
                </div>
            ) 
            }
        </div>
    )
}