import IMessage from "@/interfaces/IMessage";
import MesCard from "./MesCard";

interface IProps {
    messages: IMessage[]
}

export default function MesList({ messages }: IProps) {

    return (
        <div className="flex space-x-2">
            {messages.map(ms => {
                return (
                    <div className="2xl:w-1/2 ">
                        <MesCard mes={ms} />
                    </div>
                )
            })}
        </div>
    )
}