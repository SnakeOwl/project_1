import axiosClient from "@/axios-client"
import IOrder from "@/interfaces/IOrder";
import "server-only"


async function getShape(categoryID: string, shapeID: string): Promise<IOrder>{
    const {data} = await axiosClient.get(`admin/categories/${categoryID}/shapes/${shapeID}`);
    return data;
}


interface IProps{
    params: {
        categoryID: string
        shapeID: string
    }
}

export default async function OrdersPage({
    params:{ categoryID, shapeID }
}: IProps){

    const shape = shapeID? await getShape(categoryID, shapeID): undefined  ;

    return (
        <main>
            <h1>Заказы пользователей</h1>

            <p className="text-red-400">Доделать этот участок когда будет вменяемое оформление заказа</p>
        </main>
    )
}


// metadata. server only!
export async function generateMetadata() {
    return {
        title: "Заказы пользователей",
    }
}