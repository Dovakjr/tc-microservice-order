import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from './usecase-proxy';
import { RepositoriesModule } from '../repositories/repositories.module';
import { OrderRepositorySequelize } from '../repositories/order.repository.impl.sequelize';
import { CreateOrderUseCase } from 'src/application/use-cases/create-order.use-case';
import { FindOneOrderUseCase } from 'src/application/use-cases/find-one-order.use-case';
import { FindAllOrdersUseCase } from 'src/application/use-cases/find-all-orders.use-case';
import { FindAllOrdersWithProductsUseCase } from 'src/application/use-cases/find-all-orders-with-products.use-case copy';
import { MercadoPagoWebhook } from '../webhooks/mercado-pago-webhook';
import { GetOrderPaymentStatus } from 'src/application/use-cases/get-order-payment-status.use-case';
import { UpdateOrderUseCase } from 'src/application/use-cases/update-order.use-case';

@Module({
  imports: [RepositoriesModule],
})
export class UsecaseProxyModule {
  //ORDER
  static CREATE_ORDER_USE_CASE = 'createOrderUseCaseProxy';
  static FIND_ONE_ORDER_USE_CASE = 'findOneOrderUseCaseProxy';
  static FIND_ALL_ORDER_USE_CASE = 'findAllOrdersUseCaseProxy';
  static FIND_ALL_ORDER_WITH_PRODUCTS_USE_CASE =
    'findAllOrdersWithProductsUseCaseProxy';
  static UPDATE_ORDER_USE_CASE = 'updateOrderUseCaseProxy';
  static GET_ORDER_PAYMENT_STATUS_USE_CASE = 'getPaymentStatus';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [OrderRepositorySequelize],
          provide: UsecaseProxyModule.CREATE_ORDER_USE_CASE,
          useFactory: (orderRepository: OrderRepositorySequelize) =>
            new UseCaseProxy(new CreateOrderUseCase(orderRepository)),
        },
        {
          inject: [OrderRepositorySequelize],
          provide: UsecaseProxyModule.FIND_ONE_ORDER_USE_CASE,
          useFactory: (ordertRepository: OrderRepositorySequelize) =>
            new UseCaseProxy(new FindOneOrderUseCase(ordertRepository)),
        },
        {
          inject: [OrderRepositorySequelize],
          provide: UsecaseProxyModule.FIND_ALL_ORDER_USE_CASE,
          useFactory: (ordertRepository: OrderRepositorySequelize) =>
            new UseCaseProxy(new FindAllOrdersUseCase(ordertRepository)),
        },
        {
          inject: [OrderRepositorySequelize],
          provide: UsecaseProxyModule.FIND_ALL_ORDER_WITH_PRODUCTS_USE_CASE,
          useFactory: (ordertRepository: OrderRepositorySequelize) =>
            new UseCaseProxy(
              new FindAllOrdersWithProductsUseCase(ordertRepository),
            ),
        },
        {
          inject: [OrderRepositorySequelize],
          provide: UsecaseProxyModule.GET_ORDER_PAYMENT_STATUS_USE_CASE,
          useFactory: (mercadoPagoWebhook: MercadoPagoWebhook) =>
            new UseCaseProxy(new GetOrderPaymentStatus(mercadoPagoWebhook)),
        },
        {
          inject: [OrderRepositorySequelize],
          provide: UsecaseProxyModule.UPDATE_ORDER_USE_CASE,
          useFactory: (orderRepository: OrderRepositorySequelize) =>
            new UseCaseProxy(new UpdateOrderUseCase(orderRepository)),
        },
      ],
      exports: [
        UsecaseProxyModule.CREATE_ORDER_USE_CASE,
        UsecaseProxyModule.FIND_ONE_ORDER_USE_CASE,
        UsecaseProxyModule.FIND_ALL_ORDER_USE_CASE,
        UsecaseProxyModule.FIND_ALL_ORDER_WITH_PRODUCTS_USE_CASE,
        UsecaseProxyModule.GET_ORDER_PAYMENT_STATUS_USE_CASE,
        UsecaseProxyModule.UPDATE_ORDER_USE_CASE,
      ],
    };
  }
}
