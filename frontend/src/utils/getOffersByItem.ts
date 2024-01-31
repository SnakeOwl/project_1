import fetchClient from "@/fetch-client";
import IOffer from "@/interfaces/IOffer";

export default async function getOffersByItem(itemID: string, ...params:any): Promise<IOffer[]>{
    const response = await fetchClient.get(`get/items/${itemID}/offers`, ...params)
    switch (response.status) {
        case 200:
            const { jsonData } = response;
            return jsonData;
    }
    
    throw new Error("Can't get item from server");
}