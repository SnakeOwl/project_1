"use client"

import ContextUser from "@/context/User/ContextUser";
import { useContext } from "react";


class Basket {
    private dispatchUser: React.Dispatch<any>;

    constructor(){
        const { dispatchUser } = useContext(ContextUser);
        this.dispatchUser = dispatchUser;
    }

    setKey(key: string){
        // если ключ уже есть, то перезаписывать не нужно
        if (this.getKey())
            return false;

        localStorage.bkey = key;

        this.dispatchUser({
            type: "SET_BKEY",
            bkey: key
        });
    }

    getKey(): string | false {
        if (typeof localStorage.bkey === "string" )
            return localStorage.bkey;

        return false;
    }

    eraseData(){
        if (typeof localStorage.bkey === "string")
            delete localStorage.bkey;

        this.dispatchUser({
            type: "SET_BKEY",
            bkey: null
        });
    }
}

// создавать и експотить объект нельзя, потому что выдает критическую.
export default Basket;