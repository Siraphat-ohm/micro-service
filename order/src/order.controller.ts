import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern } from '@nestjs/microservices';
import { Order, Prisma } from '@prisma/client';

@Controller()
export class OrderController {
  constructor(private readonly appService: OrderService) {}

  @MessagePattern('get-order')
  async order(id: string){
    return this.appService.getOrderById(Number(id));
  }

  @MessagePattern('get-orders')
  async orders(params: Prisma.OrderFindManyArgs){
    return this.appService.getOrders(params);
  }

  @MessagePattern('create-order')
  async createOrder(order: Order){
    return this.appService.createOrder(order);
  }

  @MessagePattern('update-order')
  async updateOrder(params: { id: string; data: Order }){
    const { id, data } = params;
    return this.appService.updateOrder(Number(id), data);
  }

  @MessagePattern('delete-order')
  async deleteOrder(id: string){
    return this.appService.deleteOrder(Number(id));
  }
}
