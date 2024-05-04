import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnSupplierDto } from './dtos/returnSupplier.dto';
import { CreateSupplierDto } from './dtos/createSupplier.dto';

@Injectable()
export class SupplierService {
    constructor(
        private prisma: PrismaService
    ) { }

    async createSupplier(createSupplierDto: CreateSupplierDto): Promise<ReturnSupplierDto> {
        const supplier = await this.prisma.supplier.create({
            data: createSupplierDto,
        });

        const returnSuplier: ReturnSupplierDto = {
            uuid_supplier: supplier.uuid_supplier,
            description: supplier.description,
            cnpj: supplier.cnpj,
            phone: supplier.phone,
            email: supplier.email,
        }

        return returnSuplier;
    }
}
