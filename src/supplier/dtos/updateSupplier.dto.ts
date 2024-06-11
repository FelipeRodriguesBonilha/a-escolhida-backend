import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class UpdateSupplierDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    cnpj: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}