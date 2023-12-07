import axiosClient from "@/axios-client"
import IStorage from "@/interfaces/IStorage";
import "server-only"
import StoragesList from "./_Components/StoragesList";


async function getStorages(): Promise<IStorage[]>{
    const response = await axiosClient.get("get/storages");
    const {data} = response;

    return data;
}


export default async function StoragesPage(){

    const storages = await getStorages();


    return (
        <main>
            <h1>Управление Складами</h1>

            <StoragesList storages={storages} />
        </main>
    )
}


// metadata. server only!
export async function generateMetadata() {
    return {
        title: "Управление складами",
    }
}