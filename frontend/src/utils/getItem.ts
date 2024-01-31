import fetchClient from "@/fetch-client";
import IItem from "@/interfaces/IItem";

export default async function getItem(itemID: string, ...params:any): Promise<IItem>{
    const response = await fetchClient.get(`get/item/${itemID}`, ...params)
    switch (response.status) {
        case 200:
            const { jsonData } = response;
            return jsonData;
    }
    
    throw new Error("Can't get item from server");
}