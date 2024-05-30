import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ReturnProductDto } from './dtos/returnProduct.dto';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { TypesRoles } from 'src/user/enums/typesRoles.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService,
    ){}

    @Roles(TypesRoles.User)
    @UseInterceptors(FileInterceptor('image'))
    @Post('create')
    createProduct(@UploadedFile() image: Express.Multer.File, @Body() createProductDto: CreateProductDto): Promise<ReturnProductDto> {
        return this.productService.createProduct(image, createProductDto);
    }

    @Roles(TypesRoles.User)
    @Get('get-all')
    getAllProducts(): Promise<ReturnProductDto[]>{
        return this.productService.getAllProduct();
    }

    @Roles(TypesRoles.User)
    @Get('get-highlights')
    getHighlights(): Promise<ReturnProductDto[]>{
        return this.productService.getHighlights();
    }

    @Roles(TypesRoles.User)
    @Patch('like/:uuid_product')
    likeProduct(@Param('uuid_product') uuid_product: string): Promise<ReturnProductDto>{
        return this.productService.likeProduct(uuid_product);
    }
}
