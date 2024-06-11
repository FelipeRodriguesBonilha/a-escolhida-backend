import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { TypesRoles } from './enums/typesRoles.enum';
import { User } from '@prisma/client';
import { UserId } from 'src/decorators/userId.decorator';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
    ){}

    @Post('/create')
    createUser(@Body() createUserDto: CreateUserDto): Promise<ReturnUserDto> {
        return this.userService.createUser(createUserDto);
    }

    @Roles(TypesRoles.User, TypesRoles.Admin)
    @Get('/get-user-by-id')
    getUserById(@UserId() uuid_user: string): Promise<ReturnUserDto> {
        return this.userService.getUserById(uuid_user);
    }
}
