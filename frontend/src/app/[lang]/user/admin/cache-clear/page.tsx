import { revalidatePath } from "next/cache"
import "server-only"

export default async function CacheClearPage(){
    revalidatePath("/", "page");

    return <main>Done.</main>
}