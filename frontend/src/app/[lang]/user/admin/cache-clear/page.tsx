import { revalidatePath } from "next/cache"
import "server-only"

export default async function CacheClearPage(){
    if (window.confirm("Сбросить кеш?"))
        revalidatePath("/", "page");

    return <main>Done.</main>
}