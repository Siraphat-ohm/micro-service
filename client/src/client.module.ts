import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientService } from './client.service';
import { ProductController } from './product/client-product.controller';
import { UserController } from './user/client-user.controller';
import { OrderController } from './order/order.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.TCP,
        options: { port: 3000 },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
      {
        name: 'ORDER_SERVICE',
        transport: Transport.TCP,
        options: { port: 3003 },
      }
    ]),
  ],
  controllers: [ProductController, UserController, OrderController],
  providers: [ClientService],
})
export class ClientModule {}