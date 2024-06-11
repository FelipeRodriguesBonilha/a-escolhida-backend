import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { ReturnCategoryDto } from './dtos/returnCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';

@Injectable()
export class CategoryService {
    constructor(
        private prisma: PrismaService
    ) { }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<ReturnCategoryDto> {
        const category = await this.prisma.category.create({
            data: {
                ...createCategoryDto,
            }
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
        });

        const returnCategories: ReturnCategoryDto[] = categories.map(category => ({
            uuid_category: category.uuid_category,
            description: category.description,
        }));

        return returnCategories;
    }

    async getCategoryById(uuid_category: string): Promise<ReturnCategoryDto> {
        const category = await this.prisma.category.findUnique({
            where: { uuid_category },
        });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        const returnCategory: ReturnCategoryDto = {
            uuid_category: category.uuid_category,
            description: category.description,
        };

        return returnCategory;
    }

    async updateCategory(uuid_category: string, updateCategoryDto: UpdateCategoryDto): Promise<ReturnCategoryDto> {
        const category = await this.prisma.category.update({
            where: { uuid_category },
            data: updateCategoryDto,
        });

        const returnCategory: ReturnCategoryDto = {
            uuid_category: category.uuid_category,
            description: category.description,
        };

        return returnCategory;
    }

    async deleteCategory(uuid_category: string): Promise<void> {
        await this.prisma.category.delete({
            where: { uuid_category },
        });
    }
}