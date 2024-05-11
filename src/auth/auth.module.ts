import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [UserModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }
            })
        })
    ],
    controllers: [AuthController],
    providers: [PrismaService, AuthService], // Adicione uma vírgula aqui
    exports: [], // Se não estiver exportando nada, isso está correto
})

export class AuthModule {}
