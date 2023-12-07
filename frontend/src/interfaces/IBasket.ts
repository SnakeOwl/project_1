import IOffer from "./IOffer";

export default interface IBasket {
    readonly id: string
    key: string
    price: number
    status: string

    offers: IOffer[],
}