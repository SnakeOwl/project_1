import axiosClient from "@/axios-client";
import IOption from "@/interfaces/IOption";
import "server-only"
import ShapeOptionForm from "./_Components/ShapeOptionForm";


async function getShapeOption(optionID: string): Promise<IOption>{
    const response = await axiosClient.get(`get/shape-option/${optionID}`);
    const {data} = response;

    return data;
}


export default async function ShapeOptionFormPage({
    params: {
        shapeID,
        optionID
    }
}: {params: {
    shapeID: string
    optionID?: string
}}){

    const option = optionID? await getShapeOption(optionID): undefined;

    return (
        <main>
            <h1 className="text-center">Форма Опции для Опции Категории</h1>

            <div className="2xl:w-1/3 mx-auto">
                <ShapeOptionForm option={option} shapeID={shapeID} />
            </div>
        </main>
    )
}


// metadata. server only!
export async function generateMetadata() {
    return {
        title: "Форма Опции для Опции Категории",
    }
}