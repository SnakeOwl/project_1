export default interface IUser {
    readonly id: string
    name: string 
    email: string
    phone?: string

    rights: 10 | 6 | 5 | 3      // 10 admin, 6 partner, 5 editor, 3 registered
}