'use server'

import fetchClient from "@/fetch-client";
import ICategory from "@/interfaces/ICategory";

export default async function getCategories(...params: any):  Promise<ICategory[]> {
    const response = await fetchClient.get("get/categories", ...params)
    switch (response.status) {
        case 200:
            const { jsonData } = response;
            return jsonData;
    }
    
    throw new Error("Can't get cagetories from server.")
}