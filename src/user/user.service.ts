import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { createPasswordHashed } from 'src/utils/password';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
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

}
