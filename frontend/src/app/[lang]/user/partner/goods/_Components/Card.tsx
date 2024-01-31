import { BlueLink } from "@/_Components/ColoredLinks";
import IItem from "@/interfaces/IItem";
import AdminCardWrapper from "../../../admin/_Components/AdminCardWrapper";


interface IProps {
    dict: any
    item: IItem
}

export default function Card({
    dict,
    item
}: IProps) {

    return (
        <AdminCardWrapper
            removeAPIPath={`user/partner/items/${item.id}`}
            editLink={`/user/partner/goods/form/${item.id}`}
            className="w-full 2xl:w-1/5"
        >

            <div className="mb-4">
                {dict["cl"] == "ru" ? item.name : item.name_en}
            </div>

            <BlueLink
                className="py-2 mb-4 rounded-lg w-full text-center"
                href={`/user/partner/goods/offers/${item.id}`}>
                {dict["offers"]}
            </BlueLink>
        </AdminCardWrapper>
    )
}