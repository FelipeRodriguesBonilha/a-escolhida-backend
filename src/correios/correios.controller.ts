import { Controller, Get, Param } from '@nestjs/common';
import { CorreiosService } from './correios.service';

@Controller('correios')
export class CorreiosController {

    constructor(
        private correioService: CorreiosService
    ){}

    @Get('get-by-cep/:cep')
    getByCep(@Param('cep') cep: string): Promise<any> {
        return this.correioService.getByCep(cep);
    }
}
