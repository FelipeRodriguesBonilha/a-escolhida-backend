import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ReturnLoginDto } from './dtos/returnLogin.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Post('/login')
    loginUser(@Body() loginDto: LoginDto): Promise<ReturnLoginDto>{
        return this.authService.loginUser(loginDto);
    }
}
