import { BlueButton } from "@/_Components/Buttons/ColoredButtons";
import { GreenText } from "@/_Components/text/borderedText";
import axiosClient from "@/axios-client";
import IMessage from "@/interfaces/IMessage";
import { useState } from "react";


interface IProps {
    mes: IMessage
}

export default function MesCard({mes}: IProps){
    const [hasread, setHasread] = useState<boolean>(false);

    function deleteMessage(){
        axiosClient.delete(`admin/messages/${mes.id}`)
            .then(()=>{
                setHasread(true);
            })
            .catch(error=>{
                throw new Error(error);
            })
    }

    if (hasread)
        return <GreenText>Прочитано</GreenText>


    return (
        <div className="rounded-lg border border-gray-500 p-2">
            <div className="mb-4"># {mes.id}</div>
            <div className="mb-4">name: {mes.name}</div>
            <div className="mb-4">email: {mes.email}</div>
            <p className="mb-4">{mes.message}</p>

            <BlueButton 
                className="w-full py-2 rounded-md"
                onClick={deleteMessage}
            >
                Прочитано
            </BlueButton>
        </div>
    )
}