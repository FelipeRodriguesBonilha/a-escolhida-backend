import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnLoginDto } from './dtos/returnLogin.dto';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { validatePassword } from 'src/utils/password';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from './dtos/loginPayload.dto';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async loginUser(loginDto: LoginDto): Promise<ReturnLoginDto> {
        const user = await this.userService.getUserByEmail(loginDto.email).catch(() => undefined);

        const isMatch = await validatePassword(loginDto.password, user?.password || '');

        if(!user || !isMatch) {
            throw new NotFoundException('E-mail ou senha inválidos!')
        }

        const returnUser: ReturnUserDto = {
            uuid_user: user.uuid_user,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            phone: user.phone,
            uuid_city: user.uuid_city,
            role: user.role,
        }
        
        return {
            accessToken: await this.jwtService.signAsync({ ...new LoginPayloadDto(user) }),
            user: returnUser,
        }
    }
}
