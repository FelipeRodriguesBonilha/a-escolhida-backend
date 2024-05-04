import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnUserDto } from '../dtos/returnUser.dto';
import { CreateUserDto } from '../dtos/createUser.dto';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
        return null;
    }

}
