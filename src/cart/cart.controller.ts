import { Body, Controller, Param, Post } from '@nestjs/common';
import { Cart, CartProduct } from '@prisma/client';
import { CartService } from './cart.service';
import { AddToCart } from './dtos/addToCart.dto';

@Controller('cart')
export class CartController {

    constructor(
        private cartService: CartService,
    ){}

    @Post('add-to-cart/:uuid_user')
    addProductToCart(@Body() addToCart: AddToCart, @Param('uuid_user') uuid_user: string): Promise<CartProduct> {
        return this.cartService.addProductToCart(addToCart, uuid_user);
    }
}
