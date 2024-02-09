import IPaginationLink from "./IPaginationLink"

// 
export default interface IPaginatedResourse {
    data: any[]

    current_page: number
    from: number
    last_page: number
    last_page_url: string
    links: IPaginationLink[]
    next_page_url: null | string
    path: string
    per_page: number
    prev_page_url: null | string
    to: number
    total: number
}