"use server";

import { revalidatePath } from "next/cache";

export default async function revalidateOffer(id: string){
    revalidatePath(`en/offer/${id}`, "page");
    revalidatePath(`ru/offer/${id}`, "page");
}