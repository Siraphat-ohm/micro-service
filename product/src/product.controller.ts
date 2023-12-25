import { Body, Controller, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern } from '@nestjs/microservices';
import { Product, Prisma } from '@prisma/client';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('get-product')
  async product(id: string) {
    return await this.productService.getProductById(Number(id));
  }

  @MessagePattern('get-products')
  products(params: Prisma.ProductFindManyArgs) {
    return this.productService.getProducts(params);
  }

  @MessagePattern('create-product')
  createProduct(@Body() data: Product) {
    return this.productService.createProduct(data);
  }

  @MessagePattern('update-product')
  updateProduct(params: { id: string; data: Prisma.ProductUpdateInput }) {
    const { id, data } = params;
    return this.productService.updateProduct( Number(id), data );
  }

  @MessagePattern('delete-product')
  deleteProduct(id: string) {
    return this.productService.deleteProduct(Number(id));
  }

  @MessagePattern('take-product')
  takeProduct(params: { id: string; data: any }) {
    const { id, data } = params;
    return this.productService.updateProduct( Number(id), { stock: data.stock });
  }

}