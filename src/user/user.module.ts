import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartModule } from 'src/cart/cart.module';

@Module({
    imports: [CartModule],
    controllers: [UserController],
    providers: [PrismaService, UserService],
    exports: [UserService]
})
export class UserModule {
    
}
