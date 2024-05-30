import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { ReturnCategoryDto } from './dtos/returnCategory.dto';
import { TypesRoles } from 'src/user/enums/typesRoles.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService,
    ){}

    @Roles(TypesRoles.User)
    @Post('/create')
    createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<ReturnCategoryDto> {
        return this.categoryService.createCategory(createCategoryDto);
    }

    @Roles(TypesRoles.User, TypesRoles.Admin)
    @Get('/get-all')
    getAllCategories(): Promise<ReturnCategoryDto[]> {
        return this.categoryService.getAllCategories();
    }
}

