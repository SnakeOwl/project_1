import axiosClient from "@/axios-client";
import IStorage from "@/interfaces/IStorage";

export default async function getStorages(): Promise<IStorage[]>{
    const {data} = await axiosClient.get("get/storages");

    return data;
}