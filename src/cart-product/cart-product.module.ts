import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartProductService } from './cart-product.service';
import { CartProductController } from './cart-product.controller';

@Module({
    imports: [],
    controllers: [CartProductController],
    providers: [PrismaService, CartProductService],
    exports: [CartProductService],
})
export class CartProductModule {}
