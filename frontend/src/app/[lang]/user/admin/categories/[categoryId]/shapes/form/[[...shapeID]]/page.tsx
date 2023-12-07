import axiosClient from "@/axios-client"
import IShape from "@/interfaces/IShape"
import "server-only"
import ShapeForm from "./_Components/ShapeForm";
import ShapeOptionsList from "./_Components/ShapeOptionsList";


async function getShape(categoryID: string, shapeID: string): Promise<IShape>{
    const {data} = await axiosClient.get(`admin/categories/${categoryID}/shapes/${shapeID}`);
    return data;
}


interface IProps{
    params: {
        categoryID: string
        shapeID: string
    }
}

export default async function ShapesFormPage({
    params:{ categoryID, shapeID }
}: IProps){

    const shape = shapeID? await getShape(categoryID, shapeID): undefined  ;

    return (
        <main>
            <h1 className="text-center">Управление Опциями Категории</h1>
            <div className="2xl:w-1/2 mx-auto"> 
            <ShapeForm shape={shape} categoryID={categoryID} />
		</div>
            <h2>Опции опций Категории</h2>
            {shape !== undefined?
                <ShapeOptionsList shape={shape} />
                :
                <p>Опции для опций недоступны при создании.</p>
            }
        </main>
    )
}


// metadata. server only!
export async function generateMetadata() {
    return {
        title: "Управление Опциями Категории",
    }
}
