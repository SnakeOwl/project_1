import "server-only"
import ShapeForm from "./_Components/ShapeForm";
import ShapeOptionsList from "./_Components/ShapeOptionsList";
import getShape from "@/utils/getShape";
import PageRefresher from "@/app/[lang]/user/_Components/PageRefresher";



export default async function ShapesFormPage({
    params: { categoryID, shapeID }
}: {
    params: {
        categoryID: string
        shapeID: string
    }
}) {

    const shape = shapeID
        ? await getShape(categoryID, shapeID, { cache: "no-store" })
        : undefined;

    return (
        <main>
            <h1 className="text-center">Управление Опциями Категории</h1>
            <div className="2xl:w-1/2 mx-auto">
                <ShapeForm shape={shape} categoryID={categoryID} />
            </div>
            <h2>Опции опций Категории</h2>
            {shape !== undefined ?
                <ShapeOptionsList shape={shape} />
                :
                <p>Опции для опций недоступны при создании.</p>
            }


            <PageRefresher />
        </main>
    )
}


// metadata. server only!
export async function generateMetadata() {
    return {
        title: "Управление Опциями Категории",
    }
}
