import { User } from "@prisma/client";

export class LoginPayloadDto {
    uuid_user: string;

    constructor(user: User){
        this.uuid_user = user.uuid_user;
    }
}