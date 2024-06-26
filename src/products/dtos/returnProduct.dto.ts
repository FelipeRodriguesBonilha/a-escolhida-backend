import { Category, Supplier } from "@prisma/client";

export interface ReturnProductDto {
    uuid_product: string,
    description: string,
    stock_quantity: number,
    sold_amount: number,
    price: number,
    image_url: string,
    category: Category,
    supplier: Supplier,
    created_at: Date,
    updated_at: Date
    //uuid_category: string,
    //uuid_supplier: string,
}