import { Body, Controller, Post } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dtos/createSupplier.dto';
import { ReturnSupplierDto } from './dtos/returnSupplier.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { TypesRoles } from 'src/user/enums/typesRoles.enum';

@Controller('supplier')
export class SupplierController {
    constructor(
        private supplierService: SupplierService,
    ){}

    @Roles(TypesRoles.Admin)
    @Post('/create')
    createSupplier(@Body() createSupplierDto: CreateSupplierDto): Promise<ReturnSupplierDto> {
        return this.supplierService.createSupplier(createSupplierDto);
    }
}
