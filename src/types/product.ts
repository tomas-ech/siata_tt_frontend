export interface IProduct {
    name: string
    id: number
    description: string | null
    price: number
    product_type_id: number
}

export interface IProductType {
    id: number
    name: string
    description: string | null
}