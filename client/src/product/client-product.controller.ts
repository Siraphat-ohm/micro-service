import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, UseFilters, UsePipes } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IProductCreateResponse, IProductDeleteResponse, IProductGetResponse, IProductGetsResponse, IProductUpdateResponse } from 'src/interfaces/dto/product.dto';
import { IProduct } from 'src/interfaces/product.interface';


@Controller()
export class ProductController {
  constructor(@Inject("PRODUCT_SERVICE") private readonly client: ClientProxy) {}

  @Get('product/:id')
  async getProduct(@Param('id') id: string): Promise<IProductGetResponse> {
    const productResponse: IProductGetResponse = await firstValueFrom(this.client.send('get-product', id));
    if ( productResponse.status >= HttpStatus.BAD_REQUEST ) {
      throw new HttpException(productResponse.message, productResponse.status);
    }
    return productResponse;
  }

  @Get('products')
  async getProducts(): Promise<IProductGetsResponse> {
    const productsResponse = await firstValueFrom(this.client.send('get-products', {}));
    if ( productsResponse.status >= HttpStatus.BAD_REQUEST ) {
      throw new HttpException(productsResponse.message, productsResponse.status);
    }
    return productsResponse;
  }

  @Post('product')
  async addProduct(@Body() product: IProduct): Promise<IProductCreateResponse> {
    const productResponse: IProductCreateResponse = await firstValueFrom(this.client.send('create-product', product));
    if ( productResponse.status >= HttpStatus.BAD_REQUEST ) {
      throw new HttpException(productResponse.message, productResponse.status);
    }
    return productResponse;
  }

  @Put('product/:id')
  async updateProduct(@Param('id') id: number, @Body() data: IProduct): Promise<IProductUpdateResponse> {
    const productResponse: IProductUpdateResponse = await firstValueFrom(this.client.send('update-product', { id, data }));
    if ( productResponse.status >= HttpStatus.BAD_REQUEST ) {
      throw new HttpException(productResponse.message, productResponse.status);
    }
    return productResponse;
  }

  @Delete('product/:id')
  async deleteProduct(@Param('id') id: number): Promise<IProductDeleteResponse> {
    const productResponse: IProductDeleteResponse = await firstValueFrom(this.client.send('delete-product', id));
    if ( productResponse.status >= HttpStatus.BAD_REQUEST ) {
      throw new HttpException(productResponse.message, productResponse.status);
    }
    return productResponse;
  }
}