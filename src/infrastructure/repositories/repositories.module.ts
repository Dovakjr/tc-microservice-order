import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderRepositorySequelize } from './order.repository.impl.sequelize';
import { OrderModel } from '../models/order.model';
import { MercadoPagoWebhook } from '../webhooks/mercado-pago-webhook';

@Module({
  imports: [SequelizeModule.forFeature([OrderModel])],
  providers: [OrderRepositorySequelize, MercadoPagoWebhook],
  exports: [OrderRepositorySequelize, MercadoPagoWebhook],
})
export class RepositoriesModule {}
