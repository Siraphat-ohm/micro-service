import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { IOrderCreateResponse, IOrderGetResponse } from "src/interfaces/dto/order.dto";
import { IOrder } from "src/interfaces/order.interface";

@Controller()
export class OrderController {
    constructor(@Inject("ORDER_SERVICE") private readonly client: ClientProxy) { }
    
    @Get('order/:id')
    async getOrder(@Param('id') id: string): Promise<IOrderGetResponse> {
        const orderResponse: IOrderGetResponse = await firstValueFrom(this.client.send('get-order', id));
        if ( orderResponse.status >= HttpStatus.BAD_REQUEST ) {
            throw new HttpException(orderResponse.message, orderResponse.status);
        }
        return orderResponse;
    }

    @Get('orders')
    async getOrders(): Promise<IOrderGetResponse> {
        const orderResponse: IOrderGetResponse = await firstValueFrom(this.client.send('get-orders', {}));
        if ( orderResponse.status >= HttpStatus.BAD_REQUEST ) {
            throw new HttpException(orderResponse.message, orderResponse.status);
        }
        return orderResponse;
    }

    @Post('order')
    async createOrder(@Body() order: IOrder): Promise<IOrderCreateResponse> {
        const orderResponse: IOrderCreateResponse = await firstValueFrom(this.client.send('create-order', order))
        if ( orderResponse.status >= HttpStatus.BAD_REQUEST ) {
            throw new HttpException(orderResponse.message, orderResponse.status);
        }
        return orderResponse;
    }

    @Put('order/:id')
    async updateOrder(@Param('id') id: string, @Body() order: IOrder): Promise<IOrderCreateResponse> {
        const orderResponse: IOrderCreateResponse = await firstValueFrom(this.client.send('update-order', { id, data: order }))
        if ( orderResponse.status >= HttpStatus.BAD_REQUEST ) {
            throw new HttpException(orderResponse.message, orderResponse.status);
        }
        return orderResponse;
    }

    @Delete('order/:id')
    async deleteOrder(@Param('id') id: string): Promise<IOrderCreateResponse> {
        const orderResponse: IOrderCreateResponse = await firstValueFrom(this.client.send('delete-order', id))
        if ( orderResponse.status >= HttpStatus.BAD_REQUEST ) {
            throw new HttpException(orderResponse.message, orderResponse.status);
        }
        return orderResponse;
    }

}