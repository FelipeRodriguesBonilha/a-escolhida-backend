import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ReturnProductDto } from './dtos/returnProduct.dto';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService,
    ){}

    @UseInterceptors(FileInterceptor('image'))
    @Post('/create')
    createProduct(@UploadedFile() image: Express.Multer.File, @Body() createProductDto: CreateProductDto): Promise<ReturnProductDto> {
        console.log(image)
        return this.productService.createProduct(image, createProductDto);
    }

    @Get('get-all')
    getAllProducts(): Promise<ReturnProductDto[]>{
        return this.productService.getAllProduct();
    }
}
