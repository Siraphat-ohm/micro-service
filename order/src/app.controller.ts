import { Controller } from '@nestjs/common';
import { OrderService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { Order, Prisma } from '@prisma/client';

@Controller()
export class OrderController {
  constructor(private readonly appService: OrderService) {}

  @MessagePattern('get-order')
  async order(id: number){
    return this.appService.order(id);
  }

  @MessagePattern('get-orders')
  async orders(params: Prisma.OrderFindManyArgs){
    return this.appService.orders(params);
  }

  @MessagePattern('create-order')
  async createOrder(order: Order){
    return this.appService.createOrder(order);
  }

}
