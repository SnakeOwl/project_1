import axiosClient from "@/axios-client";
import IUser from "@/interfaces/IUser";


// функция должна запускаться через useEffect, иначе при первом рендере не видно window (из-за SSR)
export default async function getUser(): Promise<IUser | false> {

    if (window?.localStorage.getItem("ACCESS_TOKEN") === undefined)
        return false;

    let result = false;
    
    await axiosClient.get("user")
        .then(({data})=>{
            result = data
        })
        .catch(error=>{
            console.log("Can't get user from server. ", error);
        })
    
    return result;
}