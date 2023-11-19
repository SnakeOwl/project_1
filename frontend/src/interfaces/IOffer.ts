import IImage from "./IImage";
import IItem from "./IItem";
import IOption from "./IOption";

export default interface IOffer {
    id: string,
    short_image?: string,
    price: number,
    count: number,

    item?: IItem,
    options?: IOption[],

    pivot?: {
        basket_id: number
        count: number
        offer_id: number
    },

    images?: IImage[]

    optionsIDs?: number[]
}