import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ReturnProductDto } from './dtos/returnProduct.dto';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService
    ) { }

    
    async createProduct(image: Express.Multer.File, createProductDto: CreateProductDto): Promise<ReturnProductDto> {
        try {
            if (!image) {
                throw new HttpException('nenhum arquivo de imagem enviado', HttpStatus.BAD_REQUEST);
            }

            const uniqueFilename = uuidv4() + path.extname(image.originalname);
            const uploadPath = path.resolve(__dirname, '..', '..', 'uploads', uniqueFilename);

            fs.writeFileSync(uploadPath, image.buffer);

            const imageUrl: string = `uploads/${uniqueFilename}`;

            const product = await this.prisma.product.create({
                data: {
                    description: createProductDto.description,
                    stock_quantity: parseInt(createProductDto.stock_quantity),
                    price: parseFloat(createProductDto.price),
                    image_url: imageUrl,
                    category: {
                        connect: { uuid_category: createProductDto.uuid_category }
                    },
                    supplier: {
                        connect: { uuid_supplier: createProductDto.uuid_supplier }
                    }
                },
                include: {
                    category: true,
                    supplier: true
                }
            });

            return {
                uuid_product: product.uuid_product,
                description: product.description,
                stock_quantity: product.stock_quantity,
                sold_amount: product.sold_amount,
                price: product.price,
                image_url: product.image_url,
                category: product.category,
                supplier: product.supplier,
                created_at: product.created_at,
                updated_at: product.updated_at
            };


        } catch (error) {
            throw new HttpException(`Erro ao criar o produto: ${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }

    getAllProduct(): Promise<ReturnProductDto[]> {
        return this.prisma.product.findMany({
            orderBy: {
                description: 'asc'
            },
            include: {
                category: true,
                supplier: true
            }
        })
    }

    async getHighlights(): Promise<ReturnProductDto[]> {
        const topProducts = await this.prisma.product.findMany({
            orderBy: [
                {
                    likes: 'desc'
                },
                {
                    created_at: 'asc'
                }
            ],
            include: {
                category: true,
                supplier: true
            },
            take: 18
        });
    
        return topProducts;
    }

    async likeProduct(uuid_product: string): Promise<ReturnProductDto> {
        return await this.prisma.product.update({
            where: {
                uuid_product
            },
            data: {
                likes: {
                    increment: 1
                }
            },
            include: {
                category: true,
                supplier: true
            }
        });
    }

}

