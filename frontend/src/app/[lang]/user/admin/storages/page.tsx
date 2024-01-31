import "server-only"
import StoragesList from "./_Components/StoragesList";
import getStorages from "@/utils/getStorages";
import PageRefresher from "../../_Components/PageRefresher";


export default async function StoragesPage(){

    const storages = await getStorages();

    return (
        <main>
            <h1>Управление Складами</h1>

            <StoragesList storages={storages} />

            <PageRefresher />
        </main>
    )
}


// metadata. server only!
export async function generateMetadata() {
    return {
        title: "Управление складами",
    }
}