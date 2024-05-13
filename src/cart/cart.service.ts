import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCart } from './dtos/addToCart.dto';
import { Cart, CartProduct } from '@prisma/client';
import { CartProductService } from 'src/cart-product/cart-product.service';

@Injectable()
export class CartService {

    constructor(
        private cartProductService: CartProductService,
        private prisma: PrismaService
    ) { }

    async verifyCartActive(uuid_user: string): Promise<Cart> {
        const cart = await this.prisma.cart.findFirst({
            where: {
                AND: {
                    uuid_user: uuid_user,
                    active: true,
                }
            },
            include: {
                cart_products: true
            }
        });

        if(!cart){
            throw new NotFoundException('Usuário não possui carrinho ativo!')
        }

        return cart;
    }

    async createCart(uuid_user: string) {
        return await this.prisma.cart.create({
            data: {
                uuid_user: uuid_user,
                active: true
            }
        })
    }

    async addProductToCart(addToCart: AddToCart, uuid_user: string): Promise<CartProduct> {
        const cart = await this.verifyCartActive(uuid_user).catch(() => this.createCart(uuid_user));

        return this.cartProductService.addProductToCart(addToCart, cart)
    }

    async getCart(uuid_user: string): Promise<Cart> {
        const cart = await this.verifyCartActive(uuid_user);

        return cart;
    }
}
