'use server'

import axiosClient from "@/axios-client";

export default async function getCategories(){
    const {data} = await axiosClient.get("get/categories")
    return data;
}