import { User } from "@prisma/client";
import { ReturnUserDto } from "src/user/dtos/returnUser.dto";

export interface ReturnLoginDto {
    accessToken: string,
    user: ReturnUserDto,
}