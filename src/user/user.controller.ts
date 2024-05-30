import { Body, Controller, Post } from '@nestjs/common';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { TypesRoles } from './enums/typesRoles.enum';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
    ){}

    @Roles(TypesRoles.User, TypesRoles.Admin)
    @Post('/create')
    createUser(@Body() createUserDto: CreateUserDto): Promise<ReturnUserDto> {
        return this.userService.createUser(createUserDto);
    }
}
