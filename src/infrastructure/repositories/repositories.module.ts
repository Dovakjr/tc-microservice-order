import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderRepositorySequelize } from './order.repository.impl.sequelize';
import { OrderModel } from '../models/order.model';
import { MercadoPagoWebhook } from '../webhooks/mercado-pago-webhook';
import { PubSubService } from '../services/pub-sub.service'; // Importe o serviço PubSubService

@Module({
  imports: [SequelizeModule.forFeature([OrderModel])],
  providers: [OrderRepositorySequelize, MercadoPagoWebhook, PubSubService], // Adicione o serviço PubSubService como provedor
  exports: [OrderRepositorySequelize, MercadoPagoWebhook, PubSubService], // Exporte o serviço PubSubService
})
export class RepositoriesModule {}
