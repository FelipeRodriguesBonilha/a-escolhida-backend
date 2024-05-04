import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  providers: [PrismaService, ProductService],
  controllers: [ProductController],
  exports: []
})
export class ProductModule {}
