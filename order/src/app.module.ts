import { Module } from '@nestjs/common';
import { OrderController } from './app.controller';
import { OrderService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class AppModule {}
