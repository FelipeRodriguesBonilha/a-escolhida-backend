import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StateService } from './state.service';
import { StateController } from './state.controller';

@Module({
    imports: [],
    controllers: [StateController],
    providers: [PrismaService, StateService], // Adicione uma vírgula aqui
    exports: [], // Se não estiver exportando nada, isso está correto
})
export class StateModule {}
