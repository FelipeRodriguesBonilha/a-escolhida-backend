import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SeedsService } from './seeds.service';

@Module({
    controllers: [],
    providers: [PrismaService, SeedsService],
})
export class SeedsModule {
    
}
