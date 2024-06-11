import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Cart, CartProduct } from '@prisma/client';
import { AddToCart } from 'src/cart/dtos/addToCart.dto';
import { RemoveToCart } from 'src/cart/dtos/removeToCart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartProductService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async verifyProductInCart(uuid_cart: string, uuid_product: string): Promise<CartProduct | null> {
        const cartProduct = await this.prisma.cartProduct.findFirst({
            where: {
                AND: {
                    uuid_cart,
                    uuid_product,
                },
            },
        });

        if (!cartProduct) {
            throw new NotFoundException('Produto não existe no carrinho!')
        }

        return cartProduct;
    }

    async addProductToCart(addToCart: AddToCart, cart: Cart): Promise<CartProduct> {
        const productInCart = await this.verifyProductInCart(cart.uuid_cart, addToCart.uuid_product).catch(() => undefined)

        if (!productInCart) {
            return await this.prisma.cartProduct.create({
                data: {
                    uuid_cart: cart.uuid_cart,
                    uuid_product: addToCart.uuid_product,
                    quantity_product: addToCart.quantity_product,
                },
                include: {
                    cart: true,
                    product: true,
                }
            })
        } else {
            return await this.prisma.cartProduct.update({
                where: {
                    uuid_cart_product: productInCart.uuid_cart_product,
                },
                data: {
                    quantity_product: productInCart.quantity_product + addToCart.quantity_product,
                },
                include: {
                    cart: true,
                    product: true,
                }
            })
        }
    }

    async removeProductToCart(removeToCart: RemoveToCart, cart: Cart): Promise<CartProduct> {
        const productInCart = await this.verifyProductInCart(cart.uuid_cart, removeToCart.uuid_product);

        const quantity = productInCart.quantity_product - removeToCart.quantity_product;

        if(quantity <= 0){
            return await this.prisma.cartProduct.delete({
                where: {
                    uuid_cart_product: productInCart.uuid_cart_product,
                }
            });
        } else {
            return await this.prisma.cartProduct.update({
                where: {
                    uuid_cart_product: productInCart.uuid_cart_product,
                },
                data: {
                    quantity_product: quantity,
                },
            });
        }   
    }

    async countProductsInCart(cart: Cart): Promise<number> {
        return await this.prisma.cartProduct.count({
            where: {
                uuid_cart: cart.uuid_cart,
            },
        });
    }

    async removeAllProductsToCart(cart: Cart): Promise<{ count: number }> {
        const productCount = await this.countProductsInCart(cart);

        if (productCount === 0) {
            throw new NotFoundException('Não há produtos no carrinho.');
        }

        return await this.prisma.cartProduct.deleteMany({
            where: {
                uuid_cart: cart.uuid_cart,
            },
        });
    }
}
