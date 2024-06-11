import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { createPasswordHashed } from 'src/utils/password';

const prisma = new PrismaClient();

async function main() {
    const createUser: CreateUserDto = {
        email: 'felipebonilha013@gmail.com',
        name: 'Felipe Rodrigues',
        phone: '18996953230',
        cpf: '52592938869',
        uuid_city: 'baba4c85-c911-4ba2-a5bd-918e99ed2d97',
        password: 'senhaSeguraAEscolhidaMakeup2108',
        role: 2
    }

    const passwordHashed = await createPasswordHashed(createUser.password)

    await prisma.user.create({
        data: {
            ...createUser,
            password: passwordHashed
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
