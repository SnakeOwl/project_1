import axiosClient from "@/axios-client";
import IStorage from "@/interfaces/IStorage";

export default async function getStorage(storageID: string): Promise<IStorage>{
    const {data} = await axiosClient.get(`get/storage/${storageID}`)

    return data;
}