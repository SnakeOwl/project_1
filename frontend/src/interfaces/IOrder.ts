import IBasket from "./IBasket"
import IOffer from "./IOffer"

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

    created_at: string

    basket?: IBasket
}