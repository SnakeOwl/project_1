import "server-only"
import StorageForm from "./_Components/StorageForm"
import axiosClient from "@/axios-client"
import IStorage from "@/interfaces/IStorage";



async function getStorage(storageID: string): Promise<IStorage>{
    const {data} = await axiosClient.get(`get/storage/${storageID}`)
        .catch(error =>{ 
            throw new Error("Не могу получить Storage с Сервера.") 
        });

    return data;
}


interface IProps {
    params: {
        storageID?: string
    }
}


export default async function StorageFormPage({
    params:{ storageID }
}: IProps ){

    const storage = (storageID != undefined)? await getStorage(storageID): undefined;

    return(
        <main>
            <h1 className="text-center">Форма склада {storageID? `#${storageID}`: ""}</h1>
            <StorageForm storage={storage} />
        </main>
    )
}

// metadata. server only!
export async function generateMetadata() {
    return {
        title: "Форма склада",
    }
}
