import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrderModel } from '../infrastructure/models/order.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsecaseProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';

@Module({
  imports: [
    SequelizeModule.forFeature([OrderModel]),
    UsecaseProxyModule.register(),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
