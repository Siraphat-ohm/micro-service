import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Product } from '@prisma/client';
import { IProductGetResponse, IProductGetsResponse } from 'interfaces/get-product';
import { IProductCreateResponse } from 'interfaces/create-product';
import { IProductUpdateResponse } from 'interfaces/update-product';
import { IProductDeleteResponse } from 'interfaces/delete-product';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getProductById(id: number): Promise<IProductGetResponse> {
    try {
      const product = await this.prisma.product.findUnique({ where: { id } });
      if ( !product ){
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Product not found',
          data: null,
          errors: null,
        };
      }
      return {
        status: HttpStatus.OK,
        message: 'Product found',
        data: product,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Inernal Server Error',
        data: null,
        errors: error,
      };  
    }
  }

  async getProducts(params: Prisma.ProductFindManyArgs): Promise<IProductGetsResponse> {
    try {
      const products = await this.prisma.product.findMany(params);
      if ( !products ){
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Products not found',
          data: null,
          errors: null,
        };
      }
      return {
        status: HttpStatus.OK,
        message: 'Products found',
        data: products,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Inernal Server Error',
        data: null,
        errors: error,
      }  
    }
  }

  async createProduct(data: Product): Promise<IProductCreateResponse> {
    try {
      if ( !data.name ) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Product name is required',
          data: null,
          errors: null,
        };
      }
      if ( !data.price ) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Product price is required',
          data: null,
          errors: null,
        };
      }
      if ( !data.stock ) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Product stock is required',
          data: null,
          errors: null,
        };
      }
      const product = await this.prisma.product.upsert({
        where: { id: data.id },
        update: {},
        create: data,
      });

      return { 
        status: HttpStatus.CREATED,
        message: 'Product created',
        data: product,
        errors: null
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        data: null,
        errors: error,

      }
    }
  }

  async updateProduct(id: number, data: Prisma.ProductUpdateInput): Promise<IProductUpdateResponse> {
    try {
      if ( !id ) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Product id is required',
          errors: null,
        };
      }
      if ( !data ) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Product data is required',
          errors: null,
        };
      }
      const foundProduct = await this.prisma.product.findUnique({ where: { id } });
      if (!foundProduct) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Product not found',
          errors: null,
        };
      }

      await this.prisma.product.update({ where: { id }, data });

      return {
        status: HttpStatus.OK,
        message: 'Product updated',
        errors: null,
      };
    } catch (error) {
      console.log(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        errors: error,
      }  
    }
  }

  async deleteProduct(id: number): Promise<IProductDeleteResponse> {
    try {
      const product =  await this.prisma.product.findUnique({ where: { id } });
      if ( !product ){
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Product not found',
          errors: null,
        }
      }
      await this.prisma.product.delete({ where: { id } });
      return {
        status: HttpStatus.OK,
        message: 'Product deleted',
        errors: null,
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        errors: error,
      }  
    }
  }
}