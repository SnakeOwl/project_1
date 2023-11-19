import IShape from "./IShape"

export default interface ICategory{
    id: string
    name: string
    name_en: string
    alias: string

    shapes?: IShape[]
}