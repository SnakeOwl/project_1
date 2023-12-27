import BigPlusLink from "@/app/[lang]/user/_Components/BigPlusLink"
import IShape from "@/interfaces/IShape"
import ShapeCard from "./ShapeCard"

interface IProps {
    categoryID: string
    shapes?: IShape[]
}

export default function ShapesList({categoryID, shapes}: IProps){
    return (
        <div className="flex flex-wrap gap-2">
        	<div className="2xl:w-1/6">
                <BigPlusLink href={`user/admin/categories/${categoryID}/shapes/form`} />
            </div>

            { shapes?.map(shape => <div className="2xl:w-1/6">
                    <ShapeCard shape={shape} categoryID={categoryID} />
                </div>
            )
            }
        </div>
    )
}
