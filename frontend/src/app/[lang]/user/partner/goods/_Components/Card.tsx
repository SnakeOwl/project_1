import { RedButtonReversed } from "@/_Components/Buttons/ColoredButtons";
import { BlueLink, BlueLinkReversed } from "@/_Components/ColoredLinks";
import axiosClient from "@/axios-client";
import IItem from "@/interfaces/IItem";


function removeItem(itemID: number, setGoods: Function){
    axiosClient.delete(`user/partner/items/${itemID}`)
        .then((response)=>{
            const {status} = response;

            // Пользователь удалил свой последний товар
            if (status === 204)
                return false

            setGoods(response.data);
        })
        .catch(()=>{
            throw new Error("Error! Can't get items from server.")
        })
}


interface IProps {
    dict: any
    item: IItem
    setGoods: Function
}

export default function Card({
    dict,
    item,
    setGoods
}: IProps ) {

    return (
        <div className="w-1/5 px-2">
            <div className="border border-gray-500 rounded-lg p-2">
                <div className="mb-4">
                    {dict["cl"] == "ru" ? item.name : item.name_en}
                </div>

                <BlueLink
                    className="py-2 mb-4 rounded-lg w-full text-center"
                    href={`/user/partner/goods/offers/${item.id}`}>
                    {dict["offers"]}
                </BlueLink>

                <div className="flex text-xs">
                    <BlueLinkReversed
                        href={`/user/partner/goods/form/${item.id}`}
                        className="w-1/2 py-2 text-center rounded-l-md" >
                        <i className="bi bi-gear-fill"></i>
                    </BlueLinkReversed>

                    <RedButtonReversed
                        className="w-1/2 py-1 rounded-r-md"
                        onClick={() => { removeItem(Number(item.id), setGoods) }}>
                        <i className="bi bi-x-lg"></i>
                    </RedButtonReversed>
                </div>
            </div>
        </div>
    )
}