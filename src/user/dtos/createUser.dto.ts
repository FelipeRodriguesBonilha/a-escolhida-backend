export interface CreateUserDto { 
    email: string,  
    name: string,
    phone: string,
    cpf: string,   
    password: string,
    uuid_city: string,
    role?: number
}