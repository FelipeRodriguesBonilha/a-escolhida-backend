import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { ReturnCategoryDto } from './dtos/returnCategory.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService,
    ){}

    @Post('/create')
    createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<ReturnCategoryDto> {
        return this.categoryService.createCategory(createCategoryDto);
    }

    @Get('/get-all')
    getAllCategories(): Promise<ReturnCategoryDto[]> {
        return this.categoryService.getAllCategories();
    }
}

