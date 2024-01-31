import "server-only"
import StorageForm from "./_Components/StorageForm"
import getStorage from "@/utils/getStorage";


export default async function StorageFormPage({
    params:{ storageID }
}: {
    params: {
        storageID?: string
    }
} ){

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
