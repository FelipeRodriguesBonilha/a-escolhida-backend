import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartProductModule } from 'src/cart-product/cart-product.module';

@Module({
    imports: [CartProductModule],
    controllers: [CartController],
    providers: [PrismaService, CartService],
    exports: [CartService],
})
export class CartModule {}
