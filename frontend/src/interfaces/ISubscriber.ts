import IOffer from "./IOffer"

export default interface ISubscriber {
    readonly id: string
    email: string
    offer_id: string

    offer?: IOffer
}