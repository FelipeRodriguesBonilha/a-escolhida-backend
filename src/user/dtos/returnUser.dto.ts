import { Cart } from "@prisma/client"

export interface ReturnUserDto { 
    uuid_user: string,
    email: string,  
    name: string,
    phone: string,
    cpf: string,
    uuid_city: string,
    role?: number,
    cart_active?: Cart
}