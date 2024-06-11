import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Cart, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { createPasswordHashed } from 'src/utils/password';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private cartService: CartService
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
        const user = await this.getUserByEmail(createUserDto.email).catch(() => undefined);

        if(user){
            throw new BadRequestException('E-mail já cadastrado!')
        }

        const passwordHashed = await createPasswordHashed(createUserDto.password)

        const userSaved = await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: passwordHashed
            }
        })

        const returnUser: ReturnUserDto = {
            uuid_user: userSaved.uuid_user,
            email: userSaved.email,
            name: userSaved.name,
            cpf: userSaved.cpf,
            phone: userSaved.phone,
            uuid_city: userSaved.uuid_city
        }

        return returnUser;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = this.prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        return user;
    }

    async getUserById(uuid_user: string): Promise<ReturnUserDto> {
        const user: User = await this.prisma.user.findUnique({
            where: {
                uuid_user,
            },
        });

        const cart: Cart = await this.cartService.getCart(user.uuid_user).catch(() => undefined);

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const returnUser: ReturnUserDto = {
            uuid_user: user.uuid_user,
            email: user.email,
            name: user.name,
            cpf: user.cpf,
            phone: user.phone,
            uuid_city: user.uuid_city,
            cart_active: cart,
            role: user.role,
        };

        return returnUser;
    }
}
