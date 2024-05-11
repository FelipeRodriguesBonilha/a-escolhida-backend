import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStateDto } from './dtos/createState.dto';
import { ReturnStateDto } from './dtos/returnState.dto';

@Injectable()
export class StateService {
    constructor(
        private prisma: PrismaService,
    ){}
    
    
    async createState(createStateDto: CreateStateDto): Promise<ReturnStateDto> {
        const state = await this.prisma.state.create({
            data: {
                ...createStateDto,
            },
        });

        const returnState: ReturnStateDto = {
            uuid_state: state.uuid_state,
            description: state.description,
        }

        return returnState;
    }
}
