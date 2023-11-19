import IOffer from "./IOffer";

export default interface IBasket {
    id: string,
    key: string,
    price: number,
    status: string,

    offers: IOffer[],
}