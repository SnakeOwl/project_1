import axiosClient from "@/axios-client";
import IOption from "@/interfaces/IOption";
import "server-only"
import ShapeOptionForm from "./_Components/ShapeOptionForm";


async function getShapeOption(optionID: string): Promise<IOption>{
    const response = await axiosClient.get("get/shapeOption/");
    const {data} = response;

    return data;
}


interface IProps {
    shapeID: string
    optionID?: string
}


export default async function ShapeOptionFormPage({
    shapeID,
    optionID
}: IProps ){

    const option = optionID? await getShapeOption(optionID): undefined;

    return (
        <main>
            <h1>Форма Опции для Опции Категории</h1>

            <ShapeOptionForm option={option} shapeID={shapeID} />
        </main>
    )
}


// metadata. server only!
export async function generateMetadata() {
    return {
        title: "Форма Опции для Опции Категории",
    }
}