import ICategory from "./ICategory"
import IOffer from "./IOffer"
import IParameter from "./IParameter"

export default interface IItem {
    id: string
    name: string
    name_en: string
    description: string
    description_en: string
    category_id: string

    parameters?: IParameter[] // установленные параметры
    offers?: IOffer[]
    category?: ICategory // установленная категрия (возможно со своими параметрами)
}