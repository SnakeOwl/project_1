import IOption from "./IOption"

export default interface IShape {
    readonly id: string
    name: string
    name_en: string
    
    options?: IOption[]
}