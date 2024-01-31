import fetchClient from "@/fetch-client";
import ICategory from "@/interfaces/ICategory";

export default async function getCategory(categoryID: string, ...params:any): Promise<ICategory>{
    const response = await fetchClient.get(`get/category/${categoryID}`, ...params)
    switch (response.status) {
        case 200:
            const { jsonData } = response;
            return jsonData;
    }
    
    throw new Error("Can't get category from server");
}