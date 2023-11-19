import { BlueButtonReversed, RedButton } from "@/Components/Buttons/ColoredButtons";
import Img from "@/Components/Img";
import axiosClient from "@/axios-client";
import ContextDictionary from "@/context/DIctionary/ContextDictionary";
import ContextUser from "@/context/User/ContextUser";
import IOffer from "@/interfaces/IOffer";
import Link from "next/link";
import { useContext } from "react";


export default function Card({
    offer,
    updateOffers
}: {
    offer: IOffer,
    updateOffers: Function
}) {

    const {dispatchUser} = useContext(ContextUser);
    const dictionary = useContext(ContextDictionary)


    // вычитание предмета из козины
    async function rmFromBasket() {
        const {data} = await axiosClient.get(`/basket/remove/${offer.id}`, {
            params: { key: localStorage.getItem("bkey") }
        });

        // Если из корзины убирают последний товар, то стереть корзину
        if (data.basketIsEmpty == true){
            localStorage.removeItem("bkey");
            
            dispatchUser({
                type: "SET_BKEY",
                bkey: undefined
            })
        } else{
            updateOffers();
        }
    }


    // добавление предмета в корзину
    async function addToBasket() {
        await axiosClient.get(`/basket/add/${offer.id}`, {
            params: { key: localStorage.getItem("bkey") }
        });

        updateOffers();
    }


    return (
        <div className="w-full p-2 pb-4 mx-2 xl:w-1/5 ring-1 rounded-lg ring-gray-800">
            <div className="mb-2">
                <Img className="rounded" src={offer.short_image} />
            </div>

            <div className="px-4">
                <Link href={`/offer/${offer.id}`} className="h3 mb-2">
                    {dictionary["cl"] === "ru" ? offer.item.name : offer.item.name_en}
                </Link>

                <div className="flex justify-between">
                    <span>{dictionary["price"]}</span>
                    <span>{offer.price}</span>
                </div>

                <div className="flex justify-between">
                    <span>{dictionary["count"]}</span>
                    <span>{offer.pivot !== null && offer.pivot.count}</span>
                </div>
            </div>

            <div className="flex justify-around mt-2 ">
                <BlueButtonReversed
                    onClick={rmFromBasket}
                    className="py-1 px-3 rounded "
                >
                    -
                </BlueButtonReversed>

                <span>
                    {offer.pivot !== null && offer.pivot.count}
                </span>

                {offer.count > 0 ?
                    <div className="flex justify-between">
                        <RedButton
                            onClick={addToBasket}
                            className={"px-3 py-1 w-full rounded-md"}
                        >
                            +
                        </RedButton>
                    </div>
                    :
                    <BlueButtonReversed 
                        onClick={rmFromBasket}
                        className="px-2 py-1"
                    >
                        <span>{dictionary["no more offers"]}</span>
                    </BlueButtonReversed>
                }
            </div>
        </div>
    )
}