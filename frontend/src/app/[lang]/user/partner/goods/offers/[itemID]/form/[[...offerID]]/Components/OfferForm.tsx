"use client"
import Img from "@/_Components/Img"
import { Input } from "@/_Components/Inputs/Input"
import IImage from "@/interfaces/IImage"
import IOffer from "@/interfaces/IOffer"
import { useState } from "react"
import CategoryOptions from "./CategoryOptions"
import ICategory from "@/interfaces/ICategory"
import { RedButtonReversed } from "@/_Components/Buttons/ColoredButtons"
import FormWrapper from "@/_Components/FormWrapper"
import revalidateOffer from "@/utils/cache/revalidateOffer"


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

    function _setData(e: React.ChangeEvent<HTMLInputElement>, field: string) {
        setData({
            ...data,
            [field]: e.target.value
        })
    }


    // данные для визуализации формы
    const [errors, setErrors] = useState<any>();


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

    // при обновлении элемента, нужно сбросить кеш для его публичной страницы.
    async function successCallback() {
        if (offer == undefined)
            return;

        revalidateOffer(offer.id);
    }


    return (
        <FormWrapper
            createMode={offer == undefined}
            createURL={`user/partner/items/${itemID}/offers`}
            updateURL={`user/partner/items/${itemID}/offers/${offer?.id}`}
            data={data}
            setGeneralErrors={setErrors}
            headers={{ "Content-Type": "multipart/form-data" }}
            usePostUpdate={true}
            successCallback={successCallback}
        >
            <div className="flex">
                <Input
                    className="w-full 2xl:w-1/3 mx-2"
                    value={String(data.price)}
                    onChange={(e) => _setData(e, "price")}
                    required
                    min="0"
                    type="number"
                    label={dict["price"]}
                    error={errors?.price || null}
                />

                <Input
                    id="count"
                    className="w-full 2xl:w-1/3"
                    value={String(data.count)}
                    onChange={(e) => _setData(e, "count")}
                    required
                    min="0"
                    max="255"
                    type="number"
                    label={dict["count"]}
                    error={errors?.count || null}
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
                    onChange={setShortImage}
                    accept="image"
                    type="file"
                />
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
                    type="file"
                    label={dict['offer form message 2']}
                    onChange={setGaleryImages}
                    multiple
                    accept="image"
                />

                {offer && <div className="flex flex-wrap">
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
        </FormWrapper>
    )
}
