export interface IDelivery {
    user_id: number,
    product_id: number,
    amount: number,
    delivery_type_id: number,
    price: number,
    discount: number,
    ship_cost: number,
    delivery_date: Date,
    destination_id: number,
    is_marine: boolean
}