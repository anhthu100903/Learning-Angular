import { Dish } from "./dish.model";

export interface OrderInfo {
    tablename: string,
    orderId: number,
    orderItems: OrderItem[],
}

export interface OrderItem {
    id: number,
    dish: Dish,
    details: any[],
    quantity: number
}