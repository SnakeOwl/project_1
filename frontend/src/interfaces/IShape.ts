import IOption from "./IOption"

export default interface IShape {
    id: string
    name: string
    name_en: string
    
    options?: IOption[]
}