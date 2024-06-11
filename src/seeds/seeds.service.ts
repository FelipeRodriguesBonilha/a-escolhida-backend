import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { createPasswordHashed } from 'src/utils/password';

@Injectable()
export class SeedsService {
    constructor(private readonly prisma: PrismaService) { }

    async generateSeed() {
        const createUser: CreateUserDto = {
            email: 'felipebonilha013@gmail.com',
            name: 'Felipe Rodrigues',
            phone: '18996953230',
            cpf: '52592938869',
            uuid_city: 'baba4c85-c911-4ba2-a5bd-918e99ed2d97',
            password: 'senhaSeguraAEscolhidaMakeup2108'
        }

        const passwordHashed = await createPasswordHashed(createUser.password)

        const user = await this.prisma.user.create({
            data: {
                ...createUser,
                password: passwordHashed
            },
        });

        console.log({ user });
    }
}
