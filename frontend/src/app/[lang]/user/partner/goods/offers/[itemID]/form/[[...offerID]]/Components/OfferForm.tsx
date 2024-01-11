"use client"
import Img from "@/_Components/Img"
import { Input } from "@/_Components/Inputs/Input"
import IImage from "@/interfaces/IImage"
import IOffer from "@/interfaces/IOffer"
import { useState } from "react"
import CategoryOptions from "./CategoryOptions"
import ICategory from "@/interfaces/ICategory"
import { BlueButton, RedButtonReversed } from "@/_Components/Buttons/ColoredButtons"
import axiosClient from "@/axios-client"
import { GreenText } from "@/_Components/text/borderedText"


type PostData = {
    count: number
    price: number
    optionsIDs: number[]
    shortImage?: File
    galery?: IImage[]
    newGaleryImages?: FileList
}


export default function OfferForm({
    dict,
    offer,
    category,
    itemID
}: {
    dict: any
    offer?: IOffer
    category: ICategory // category with all options
    itemID: string
}) {

    const [data, setData] = useState<PostData>({
        count: offer?.count || 255,
        price: offer?.price || 0,
        optionsIDs: offer?.optionsIDs || [],
        galery: offer?.images || []
    });

    function _setData(e: React.ChangeEvent<HTMLInputElement>) {
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }

    // данные для визуализации формы
    const [side, setSide] = useState({
        errors: {
            count: undefined,
            price: undefined,
        },
        errMessage: undefined,
        success: false
    });


    function setShortImage(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files)
            return;

        setData({
            ...data,
            shortImage: e.target.files[0]
        })
    }

    function setGaleryImages(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files)
            return;

        setData({
            ...data,
            newGaleryImages: e.target.files
        });
    }

    function removeFromGalery(index: number) {
        console.log(data.galery)
        if (data.galery == undefined)
            return;

        delete data.galery[index];
        setData({
            ...data,
            galery: data.galery
        });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const headers = {
            "Content-Type": "multipart/form-data"
        }

        let request = undefined;
        if (offer == undefined) {
            // create offer
            request = axiosClient.post(`user/partner/items/${itemID}/offers`, data, { headers });
        } else {
            // update offer
            request = axiosClient.post(`user/partner/items/${itemID}/offers/${offer.id}`, data, { headers });
        }

        Promise.resolve(request)
            .then(({ status }) => {
                if (status === 204) {
                    setSide({ ...side, success: true });
                }
            })
            .catch(error => {
                // если нет респонса, значит нет ответа от сервера
                if (error.response === undefined) {
                    console.log(dict["server conn propblem"]);

                    return;
                }

                const { response } = error
                // ошибка валидации
                if (response.data.errors != undefined) {
                    setSide(s => {
                        return {
                            ...s,
                            errors: response.data.errors
                        }
                    });
                }

                // общие ошибки
                setSide(s => {
                    return {
                        ...s,
                        errMessage: response.data.message
                    }
                });
            })

        // не забыть в реквесте заголовок кинуть
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex">
                <Input
                    id="price"
                    className="2xl:w-1/3 mx-2"
                    value={String(data.price)}
                    onChange={_setData}
                    required
                    min="0"
                    type="number"
                    label={dict["price"]}
                    error={side.errors.price}
                />

                <Input
                    id="count"
                    className="2xl:w-1/3"
                    value={String(data.count)}
                    onChange={_setData}
                    required
                    min="0"
                    max="255"
                    type="number"
                    label={dict["count"]}
                    error={side.errors.count}
                />
            </div>


            <div className="mb-4">
                <h2>{dict["offer short image"]}</h2>
                {offer?.short_image &&
                    <div>
                        <Img src={offer.short_image} />
                        <p className="text-gray-500">{dict["offer form message 1"]}</p>
                    </div>
                }
                <Input
                    id="shortImage"
                    onChange={setShortImage}
                    accept="image"
                    type="file" />
            </div>


            <div className="mb-4">
                <h2>{dict['offer shape options h']}</h2>
                <CategoryOptions
                    dict={dict}
                    category={category}
                    selectedOptions={data.optionsIDs}
                    setProperties={(options: number[]) => setData({ ...data, optionsIDs: options })}
                />
            </div>


            <div className="mb-4">
                <h2>{dict['galery management']}</h2>
                <Input
                    className="mb-2"
                    id="newGaleryImages"
                    type="file"
                    label={dict['offer form message 2']}
                    onChange={setGaleryImages}
                    multiple
                    accept="image" />

                {offer &&
                    <div className="flex flex-wrap">
                        {data.galery?.map((img, i) =>
                            <div className="2xl:w-1/4 px-2" key={img.id}>
                                <Img src={img.url} />

                                <RedButtonReversed
                                    className="block w-1/4 mt-1 mx-auto py-1 rounded-md"
                                    type="button"
                                    onClick={() => { removeFromGalery(i) }}
                                >
                                    <i className="bi bi-x-lg"></i>
                                </RedButtonReversed>
                            </div>
                        )
                        }
                    </div>
                }
            </div>


            {side.success ?
                <GreenText className="text-center">
                    {dict["success"]}
                </GreenText>
                :
                <BlueButton className="w-full py-2">
                    {dict["submit"]}
                </BlueButton>
            }
        </form>
    )
}
