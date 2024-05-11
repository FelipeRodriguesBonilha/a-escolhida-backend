import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnCityDto } from './dtos/returnCity.dto';
import { CreateCityDto } from './dtos/createCity.dto';

@Injectable()
export class CityService {
    constructor(
        private prisma: PrismaService,
    ){}
    
    
    async createCity(createCityDto: CreateCityDto): Promise<ReturnCityDto> {
        const city = await this.prisma.city.create({
            data: {
                ...createCityDto,
            },
            include: {
                state: true,
            }
        });

        const returnCity: ReturnCityDto = {
            uuid_city: city.uuid_city,
            description: city.description,
            state: city.state
        }

        return returnCity;
    }
}
