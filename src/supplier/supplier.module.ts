import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  providers: [PrismaService, SupplierService],
  controllers: [SupplierController],
  exports: []
})
export class SupplierModule {}
