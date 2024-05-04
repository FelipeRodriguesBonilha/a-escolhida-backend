export interface CreateProductDto {
    description: string,
    stock_quantity: string,
    price: string,
    uuid_category: string,
    uuid_supplier: string,
    //cart_products   CartProduct[]
}