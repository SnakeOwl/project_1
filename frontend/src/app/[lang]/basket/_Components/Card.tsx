import { BlueButtonReversed, RedButton } from "@/_Components/Buttons/ColoredButtons";
import CardWrapper from "@/_Components/CardWrapper";
import Img from "@/_Components/Img";
import { BlueText } from "@/_Components/text/borderedText";
import axiosClient from "@/axios-client";
import ContextUser from "@/context/User/ContextUser";
import IOffer from "@/interfaces/IOffer";
import Link from "next/link";
import { useContext } from "react";


export default function Card({
    offer,
    updateOffers,
    dict
}: {
    offer: IOffer,
    updateOffers: Function,
    dict: any
}) {

    const { dispatchUser } = useContext(ContextUser);


    async function removeFromBasket() {
        const { data } = await axiosClient.get(`/basket/remove/${offer.id}`, {
            params: { key: localStorage.getItem("bkey") }
        });

        // Если из корзины убирают последний товар, то стереть корзину
        if (data.basketIsEmpty == true) {
            localStorage.removeItem("bkey");

            dispatchUser({
                type: "SET_BKEY",
                bkey: undefined
            })
        } else {
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
        <CardWrapper className="pb-4">
            <div className="mb-2">
                <Img className="rounded h-full w-full object-cover" src={offer.short_image} />
            </div>

            <div className="px-4">
                <Link href={`/offer/${offer.id}`} className="h3 mb-2">
                    {dict["cl"] === "ru" ? offer.item?.name : offer.item?.name_en}
                </Link>

                <div className="flex justify-between">
                    <span>{dict["price"]}</span>
                    <span>{offer.price}</span>
                </div>

                <div className="flex justify-between">
                    <span>{dict["count"]}</span>
                    <span>{offer.pivot !== null && offer.pivot?.count}</span>
                </div>
            </div>

            <div className="flex justify-around mt-2 ">
                <BlueButtonReversed
                    onClick={removeFromBasket}
                    className="py-1 px-3 rounded "
                >
                    -
                </BlueButtonReversed>

                <span>
                    {offer.pivot !== null && offer.pivot?.count}
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
                    <BlueText>
                        <span>{dict["no more offers"]}</span>
                    </BlueText>
                }
            </div>
        </CardWrapper>
    )
}