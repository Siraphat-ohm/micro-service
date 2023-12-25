import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Order } from '@prisma/client';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { IOrderGetResponse, IOrderGetsResponse } from './interfaces/get-order';
import { IOrderCreateResponse } from './interfaces/create-order';
import { firstValueFrom } from 'rxjs';
import { IProductGetResponse } from './interfaces/get-product';
import { IOrderUpdateResponse } from './interfaces/update-order';
import { IOrderDeleteResponse } from './interfaces/delete-order';

@Injectable()
export class OrderService {
    private productService: ClientProxy;
    private userService: ClientProxy;

    constructor(private prisma: PrismaService) {
        this.productService = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: { port: 3000 }
        });
        this.userService = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: { port: 3002 }
        });
    }

    async getOrderById(id: number): Promise<IOrderGetResponse> {
        try {
            const order = await this.prisma.order.findUnique({ where: { id } });
            if (!order) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Order not found',
                    data: null,
                    errors: null
                }
            }
            return {
                status: HttpStatus.OK,
                message: 'Order has been found',
                data: order,
                errors: null
            }
        } catch (error) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
                data: null,
                errors: error
            }
        }
    }

    async getOrders(params: Prisma.OrderFindManyArgs): Promise<IOrderGetsResponse> {
        try {
            const orders = await this.prisma.order.findMany(params);
            if ( !orders ) { 
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Orders not found',
                    data: null,
                    errors: null
                }
            }
            return {
                status: HttpStatus.OK,
                message: 'Orders has been found',
                data: orders,
                errors: null
            }
        } catch (error) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
                data: null,
                errors: error
            }
        }
    }

    async createOrder(data: Order): Promise<IOrderCreateResponse> {
        try {
            const { productId, quantity, userId } = data;
            const prdouct: IProductGetResponse = await firstValueFrom(this.productService.send('get-product', productId));
            if ( quantity < 0 ) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Quantity cannot be negative',
                    data: null,
                    errors: null
                }
            }
            if (!prdouct.data) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Product not found',
                    data: null,
                    errors: null
                }
            }
            if (prdouct.data.stock < quantity) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Product stock is not enough',
                    data: null,
                    errors: null
                }
            }
            const user = await firstValueFrom(this.userService.send('get-user', userId));
            if ( !user.data ) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'User not found',
                    data: null,
                    errors: null
                }
            }
            await firstValueFrom(this.productService.send('update-product', { id: productId, data: { stock: prdouct.data.stock - quantity } }));
            
            const order = await this.prisma.order.create({ data });
            if (!order) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Order cannot be created',
                    data: null,
                    errors: null
                }
            }
            return {
                status: HttpStatus.CREATED,
                message: 'Order has been created',
                data: order,
                errors: null
            }
        } catch (error) {
            console.log(error);
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
                data: null,
                errors: error
            }
        }
    }

    async updateOrder(id: number, data: Order): Promise<IOrderUpdateResponse> {
        try {
            const { productId, quantity, userId } = data;
            if ( quantity < 0 ) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Quantity cannot be negative',
                    errors: null
                }
            }
            if ( !productId || !quantity || !userId ) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Product, quantity, and user id are required',
                    errors: null
                }
            }

            const product: IProductGetResponse = await firstValueFrom(this.productService.send('get-product', productId));
            if ( !product.data ) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Product not found',
                    errors: null
                }
            }
            const user = await firstValueFrom(this.userService.send('get-user', userId));
            if ( !user.data ) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'User not found',
                    errors: null
                }
            }
            await this.prisma.order.update({ where: { id }, data });
            await firstValueFrom(this.productService.send('update-product', { id: productId, data: { stock: { increasement:  product.data.stock - quantity   } } } ));
            return {
                status: HttpStatus.OK,
                message: 'Order has been updated',
                errors: null

            }
        } catch (error) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
                errors: error

            }
        }
    }

    async deleteOrder(id: number): Promise<IOrderDeleteResponse> {
        try {
           const order = await this.prisma.order.findUnique({ where: { id } });
            if ( !order ) {
                return {
                        status: HttpStatus.NOT_FOUND,
                        message: 'Order not found',
                        errors: null
                }
            } 
            await this.prisma.order.delete({ where: { id } });
            await firstValueFrom(this.productService.send('update-product', { id: order.productId, data: { stock: { increasement: order.quantity } } }));
            return {
                status: HttpStatus.OK,
                message: 'Order has been deleted',
                errors: null
            }
        } catch (error) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
                errors: error
            }
        }
    }
}