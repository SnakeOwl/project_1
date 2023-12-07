import axiosClient from "@/axios-client";
import CategoryForm from "./_Components/CategoryForm";
import ICategory from "@/interfaces/ICategory";
import ShapesList from "./_Components/ShapesList";


async function getCategory(categoryID: string): Promise<ICategory>{
    const {data} = await axiosClient(`get/category/${categoryID}`);
    return data;
}


interface IProps {
    params: {
        categoryID?: string
    } 
}


export default async function CategoryFormPage ({
    params: {categoryID}
}: IProps ){

    const category = (categoryID != undefined)? await getCategory(categoryID): undefined;

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
        </main>
    )
}
