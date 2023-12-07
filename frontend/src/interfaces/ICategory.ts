import IShape from "./IShape"

export default interface ICategory{
    readonly id: string
    name: string
    name_en: string
    alias: string

    shapes?: IShape[]
}