import { Body, Controller, Post } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dtos/createSupplier.dto';
import { ReturnSupplierDto } from './dtos/returnSupplier.dto';

@Controller('supplier')
export class SupplierController {
    constructor(
        private supplierService: SupplierService,
    ){}

    @Post('/create')
    createSupplier(@Body() createSupplierDto: CreateSupplierDto): Promise<ReturnSupplierDto> {
        return this.supplierService.createSupplier(createSupplierDto);
    }
}
