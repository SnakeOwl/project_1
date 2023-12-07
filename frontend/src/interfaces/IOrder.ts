import IBasket from "./IBasket"

export default interface IOrder {
    readonly id: string
    delivery_method: string
    email: string
    name: string

    payment_method: string
    payment_status: boolean
    phone: string
    price: number
    
    post_index: string
    status: string
    address: string
    date_delivered: string

    basket: IBasket
}