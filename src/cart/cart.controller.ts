import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Cart, CartProduct } from '@prisma/client';
import { CartService } from './cart.service';
import { AddToCart } from './dtos/addToCart.dto';
import { TypesRoles } from 'src/user/enums/typesRoles.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('cart')
export class CartController {

    constructor(
        private cartService: CartService,
    ){}

    @Roles(TypesRoles.User)
    @Post('add-to-cart/:uuid_user')
    addProductToCart(@Body() addToCart: AddToCart, @Param('uuid_user') uuid_user: string): Promise<CartProduct> {
        return this.cartService.addProductToCart(addToCart, uuid_user);
    }

    @Roles(TypesRoles.User)
    @Get('get-cart/:uuid_user')
    getCart(@Param('uuid_user') uuid_user: string): Promise<Cart> {
        return this.cartService.getCart(uuid_user);
    }
}
