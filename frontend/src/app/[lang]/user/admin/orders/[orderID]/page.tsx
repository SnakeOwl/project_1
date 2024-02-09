import OrderForm from "./_components/OrderForm";

export default async function OrderFormPage(props: { params: { orderID: string } }) {
    return (
        <main>

            <h1>Управление заказом #{props.params.orderID}</h1>
            <OrderForm orderID={props.params.orderID} />
        </main>
    )
}