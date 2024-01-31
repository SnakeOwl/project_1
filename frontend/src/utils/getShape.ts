import fetchClient from "@/fetch-client";
import IShape from "@/interfaces/IShape";


export default async function getShape(categoryID: string, shapeID: string, ...params: any): Promise<IShape>{
    const response = await fetchClient.get(`get/categories/${categoryID}/shapes/${shapeID}`, ...params)
    switch (response.status) {
        case 200:
            const { jsonData } = response;
            return jsonData;
    }
    
    throw new Error("Can't get shape from server");
}