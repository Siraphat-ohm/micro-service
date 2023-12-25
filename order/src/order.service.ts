import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Order } from '@prisma/client';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { IOrderGetResponse, IOrderGetsResponse } from './interfaces/get-order';
import { IOrderCreateResponse } from './interfaces/create-order';
import { firstValueFrom } from 'rxjs';
import { IProductGetResponse } from './interfaces/get-product';

@Injectable()
export class OrderService {
    private client: ClientProxy;

    constructor(private prisma: PrismaService) {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: { port: 3000 }
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
            const prdouct: IProductGetResponse = await firstValueFrom(this.client.send('get-product', productId));
            if (!prdouct) {
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
            const user = await firstValueFrom(this.client.send('get-user', userId));
            if ( !user ) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'User not found',
                    data: null,
                    errors: null
                }
            }
            await firstValueFrom(this.client.send('update-product', { id: productId, data: { stock: prdouct.data.stock - quantity } }));
            
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
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
                data: null,
                errors: error
            }
        }
    }

    async updateOrder(id: number, data: Order) {
        return this.prisma.order.update({ where: { id }, data });
    }

    async deleteOrder(id: number) {
        return this.prisma.order.delete({ where: { id } });
    }
}
