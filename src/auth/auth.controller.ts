import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ReturnLoginDto } from './dtos/returnLogin.dto';
import { LoginDto } from './dtos/login.dto';
import { TypesRoles } from 'src/user/enums/typesRoles.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Post('/login')
    loginUser(@Body() loginDto: LoginDto): Promise<ReturnLoginDto>{
        return this.authService.loginUser(loginDto);
    }


    @Roles(TypesRoles.User)
    @Get('/validate-token-user')
    verifyTokenIsValidUser(): string {
        const message = 'Este token de usuário é válido!'
        return message;
    }

    @Roles(TypesRoles.Admin)
    @Get('/validate-token-admin')
    verifyTokenIsValidAdmin(): string {
        const message = 'Este token de administrador é válido!'
        return message;
    }
}
