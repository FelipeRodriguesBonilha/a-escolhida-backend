import { Body, Controller, Post } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dtos/createState.dto';
import { ReturnStateDto } from './dtos/returnState.dto';

@Controller('state')
export class StateController {
    constructor(
        private stateService: StateService,
    ){}

    @Post('/create')
    createCity(@Body() createStateDto: CreateStateDto): Promise<ReturnStateDto> {
        return this.stateService.createState(createStateDto);
    }
}

