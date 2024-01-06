import IOrder from "@/interfaces/IOrder";

export default function GeneralInfo({
    order,
    dictionary
}: {
    order: IOrder
    dictionary: any
}) {
    return (
        <div className="flex justify-between">
            <div className="border border-gray-600 w-full xl:w-1/4 p-4 rounded-lg mx-2">
                <div className="border-b border-gray-600 py-4">
                    {`${dictionary["status"]}: ${order.status}`}
                </div>

                <div className="border-b border-gray-600 py-4">
                    {`${dictionary["payment method"]}: ${order.payment_method}`}
                </div>                

                <div className="py-4">
                    {`${dictionary["delivery method"]}: ${order.delivery_method}`}
                </div>
            </div>

            <div className="border border-gray-600 w-full xl:w-1/4 p-4 rounded-lg mx-2">
                <div className="border-b border-gray-600 py-4">
                    {`${dictionary["full price"]}: ${order.price}`}
                </div>

                <div className="py-4">
                    {`${dictionary["payment status"]}: ` + (order.payment_status === false ? dictionary["is not paid"] : dictionary["is paid"])}
                </div>
            </div>

            <div className="border border-gray-600 w-full xl:w-1/4 p-4 rounded-lg mx-2">
                <div className="border-b border-gray-600 py-4">
                    {`${dictionary["phone"]}: ${order.phone}`}
                </div>
                <div className="border-b border-gray-600 py-4">
                    {`${dictionary["date delivered"]}: ` + (order.date_delivered === null? dictionary["in process"]: order.date_delivered) }
                </div>
                <div className="py-4">
                    {`${dictionary["address"]}: ${order.address}`}
                </div>
            </div>
        </div>
    )
}