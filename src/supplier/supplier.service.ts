import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnSupplierDto } from './dtos/returnSupplier.dto';
import { CreateSupplierDto } from './dtos/createSupplier.dto';
import { UpdateSupplierDto } from './dtos/updateSupplier.dto';

@Injectable()
export class SupplierService {
    constructor(
        private prisma: PrismaService
    ) { }

    async createSupplier(createSupplierDto: CreateSupplierDto): Promise<ReturnSupplierDto> {
        const supplier = await this.prisma.supplier.create({
            data: createSupplierDto,
        });

        const returnSupplier: ReturnSupplierDto = {
            uuid_supplier: supplier.uuid_supplier,
            description: supplier.description,
            cnpj: supplier.cnpj,
            phone: supplier.phone,
            email: supplier.email,
        };

        return returnSupplier;
    }

    async getSupplierById(uuid_supplier: string): Promise<ReturnSupplierDto> {
        const supplier = await this.prisma.supplier.findUnique({
            where: { uuid_supplier },
        });

        if (!supplier) {
            throw new NotFoundException('Supplier not found');
        }

        const returnSupplier: ReturnSupplierDto = {
            uuid_supplier: supplier.uuid_supplier,
            description: supplier.description,
            cnpj: supplier.cnpj,
            phone: supplier.phone,
            email: supplier.email,
        };

        return returnSupplier;
    }

    async updateSupplier(uuid_supplier: string, updateSupplierDto: UpdateSupplierDto): Promise<ReturnSupplierDto> {
        const supplier = await this.prisma.supplier.update({
            where: { uuid_supplier },
            data: updateSupplierDto,
        });

        const returnSupplier: ReturnSupplierDto = {
            uuid_supplier: supplier.uuid_supplier,
            description: supplier.description,
            cnpj: supplier.cnpj,
            phone: supplier.phone,
            email: supplier.email,
        };

        return returnSupplier;
    }

    async deleteSupplier(uuid_supplier: string): Promise<void> {
        await this.prisma.supplier.delete({
            where: { uuid_supplier },
        });
    }
}