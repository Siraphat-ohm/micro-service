import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller()
export class OrderController {
    constructor(@Inject("ORDER_SERVICE") private readonly client: ClientProxy) { }
    
    @Get('order/:id')
    getOrder(@Param('id') id: string) {
        return this.client.send('order', id);
    }

    @Get('orders')
    getOrders() {
        return this.client.send('orders', '');
    }

    @Post('order')
    createOrder(@Body() order: any) {
        return this.client.send('create-order', order);
    }
}