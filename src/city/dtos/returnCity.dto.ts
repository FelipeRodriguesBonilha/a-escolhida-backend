import { State } from "@prisma/client";

export interface ReturnCityDto {
    uuid_city: string,
    description: string,
    state: State,
}