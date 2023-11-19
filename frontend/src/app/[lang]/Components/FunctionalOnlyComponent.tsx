import ContextUser from "@/context/User/ContextUser";
import { useContext, useEffect } from "react";

// todo: перенести этот код в более подходящее место.
export default function FunctionalOnlyComponent() {

    // подтягивание корзины и токена пользователя из localStorage
    const { stateUser, dispatchUser } = useContext(ContextUser);

    useEffect(() => {
        dispatchUser({
            type: "SET",
            token: localStorage?.getItem("ACCESS_TOKEN") || undefined,
            bkey: localStorage?.getItem("bkey") || undefined

        });
    }, [])


    return null;
}