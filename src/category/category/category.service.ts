import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { ReturnCategoryDto } from './dtos/returnCategory.dto';

@Injectable()
export class CategoryService {
    constructor(
        private prisma: PrismaService
    ) { }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<ReturnCategoryDto> {
        const category = await this.prisma.category.create({
            data: createCategoryDto,
        });

        const returnCategory: ReturnCategoryDto = {
            uuid_category: category.uuid_category,
            description: category.description,
        }

        return returnCategory;
    }

    async getAllCategories(): Promise<ReturnCategoryDto[]> {
        const categories = await this.prisma.category.findMany({
            orderBy: {
                description: 'asc'
            }
        })

        const returnCategories: ReturnCategoryDto[] = categories.map(category => ({
            uuid_category: category.uuid_category,
            description: category.description,
        }));

        return returnCategories;
    }
}



