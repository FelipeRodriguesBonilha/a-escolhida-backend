import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Cart, CartProduct } from '@prisma/client';
import { CartService } from './cart.service';
import { AddToCart } from './dtos/addToCart.dto';
import { TypesRoles } from 'src/user/enums/typesRoles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/userId.decorator';
import { RemoveToCart } from './dtos/removeToCart.dto';

@Controller('cart')
export class CartController {

    constructor(
        private cartService: CartService,
    ){}

    @Roles(TypesRoles.User)
    @Post('add-to-cart')
    addProductToCart(@Body() addToCart: AddToCart, @UserId() uuid_user: string): Promise<CartProduct> {
        return this.cartService.addProductToCart(addToCart, uuid_user);
    }

    @Delete('remove-to-cart')
    removeProductToCart(@Body() removeToCart: RemoveToCart, @UserId() uuid_user: string){
        return this.cartService.removeProductToCart(removeToCart, uuid_user);
    }

    @Delete('remove-all-to-cart')
    removeAllProductsToCart(@UserId() uuid_user: string){
        return this.cartService.removeAllProductsToCart(uuid_user);
    }

    @Roles(TypesRoles.User)
    @Get('get-cart')
    getCart(@UserId() uuid_user: string): Promise<Cart> {
        return this.cartService.getCart(uuid_user);
    }
}
