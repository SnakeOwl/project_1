import CategoryForm from "./_Components/CategoryForm";
import ShapesList from "./_Components/ShapesList";
import PageRefresher from "../../../../_Components/PageRefresher";
import getCategory from "@/utils/getCategory";


export default async function CategoryFormPage ({
    params: {categoryID}
}: {
    params: {
        categoryID?: string
    } 
} ){

    const category = (categoryID != undefined)
        ? await getCategory(categoryID, { cache: 'no-store' })
        : undefined;

    return (
        <main>
            <h1 className="text-center">Форма Категории</h1>
            <div className="2xl:w-1/2 mx-auto">           
	            <CategoryForm category={category} />	
            </div>

            <h2>Параметры Категории</h2>
            {categoryID !== undefined?
                <ShapesList shapes={category?.shapes} categoryID={categoryID} />
                :
                <div>Работа с опциями, доступны только при редактировании категории. При создании опции не отображаются.</div>
            }

            <PageRefresher />
        </main>
    )
}
