import { Body, Controller, Post } from '@nestjs/common';
import { CreateCityDto } from './dtos/createCity.dto';
import { CityService } from './city.service';
import { ReturnCityDto } from './dtos/returnCity.dto';

@Controller('city')
export class CityController {
    constructor(
        private cityService: CityService,
    ){}

    @Post('/create')
    createCity(@Body() createCityDto: CreateCityDto): Promise<ReturnCityDto> {
        return this.cityService.createCity(createCityDto);
    }
}
