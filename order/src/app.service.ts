import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Order } from '@prisma/client';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class OrderService {
    private client: ClientProxy;

    constructor(private prisma: PrismaService) {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: { port: 3000 }
        });
    }

    async order(id: number) {
        return this.prisma.order.findUnique({ where: { id } });
    }

    async orders(params: Prisma.OrderFindManyArgs) {
        return this.prisma.order.findMany(params);
    }

    async createOrder(data: Order) {
        const product = await this.client.send('take-product', { id: data.productId, quantity: data.quantity }).toPromise();
        const order = await this.prisma.order.create({ data });

        return order;
    }

    async updateOrder(id: number, data: Order) {
        return this.prisma.order.update({ where: { id }, data });
    }

    async deleteOrder(id: number) {
        return this.prisma.order.delete({ where: { id } });
    }
}
