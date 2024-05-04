import { Body, Controller, Post } from '@nestjs/common';
import { ReturnUserDto } from '../dtos/returnUser.dto';
import { UserService } from './user.service';
import { CreateUserDto } from '../dtos/createUser.dto';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
    ){}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<ReturnUserDto> {
        return this.userService.createUser(createUserDto);
    }
}
