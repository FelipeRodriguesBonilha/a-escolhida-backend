import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CityService } from './city.service';
import { CityController } from './city.controller';

@Module({
    imports: [],
    controllers: [CityController],
    providers: [PrismaService, CityService], // Adicione uma vírgula aqui
    exports: [], // Se não estiver exportando nada, isso está correto
})
export class CityModule {

}
