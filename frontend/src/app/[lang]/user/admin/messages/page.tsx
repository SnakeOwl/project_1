import axiosClient from "@/axios-client"
import IMessage from "@/interfaces/IMessage";
import "server-only"
import MesList from "./_Components/MesList";


async function getShape(): Promise<IMessage[]>{
    const {data} = await axiosClient.get(`get/messages`);
    return data;
}


export default async function MessagesPage(){

    const messages = await getShape();

    return (
        <main>
            <h1>Просмотр сообщений пользователей</h1>
            <MesList messages={messages} />
        </main>
    )
}


// metadata. server only!
export async function generateMetadata() {
    return {
        title: "Просмотр сообщений пользователей",
    }
}