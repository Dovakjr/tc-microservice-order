import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Patch,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderUseCase } from 'src/application/use-cases/create-order.use-case';
import { FindAllOrdersUseCase } from 'src/application/use-cases/find-all-orders.use-case';
import { FindOneOrderUseCase } from 'src/application/use-cases/find-one-order.use-case';
import { FindAllOrdersWithProductsUseCase } from 'src/application/use-cases/find-all-orders-with-products.use-case copy';
import { UsecaseProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxy/usecase-proxy';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrderPaymentStatus } from 'src/application/use-cases/get-order-payment-status.use-case';
import { UpdateOrderUseCase } from 'src/application/use-cases/update-order.use-case';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(UsecaseProxyModule.CREATE_ORDER_USE_CASE)
    private readonly createOrderUseCaseProxy: UseCaseProxy<CreateOrderUseCase>,
    @Inject(UsecaseProxyModule.FIND_ONE_ORDER_USE_CASE)
    private readonly findOneOrderUseCaseProxy: UseCaseProxy<FindOneOrderUseCase>,
    @Inject(UsecaseProxyModule.FIND_ALL_ORDER_USE_CASE)
    private readonly findAllOrdersUseCaseProxy: UseCaseProxy<FindAllOrdersUseCase>,
    @Inject(UsecaseProxyModule.FIND_ALL_ORDER_WITH_PRODUCTS_USE_CASE)
    private readonly findAllOrdersWithProductsUseCaseProxy: UseCaseProxy<FindAllOrdersWithProductsUseCase>,
    @Inject(UsecaseProxyModule.GET_ORDER_PAYMENT_STATUS_USE_CASE)
    private readonly getOrderPaymentStatusUseCaseProxy: UseCaseProxy<GetOrderPaymentStatus>,
    @Inject(UsecaseProxyModule.UPDATE_ORDER_USE_CASE)
    private readonly updateOrderUseCaseProxy: UseCaseProxy<UpdateOrderUseCase>,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.createOrderUseCaseProxy.getInstance().execute(createOrderDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.findOneOrderUseCaseProxy.getInstance().execute(id);
  }

  @Get('payment/:id')
  getPaymentStatus(@Param('id') id: number) {
    return this.getOrderPaymentStatusUseCaseProxy.getInstance().execute(id);
  }

  @Get('all')
  findAll() {
    return this.findAllOrdersUseCaseProxy.getInstance().execute();
  }

  @Get()
  findAllWhitProducts() {
    return this.findAllOrdersWithProductsUseCaseProxy.getInstance().execute();
  }

  @Patch()
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.updateOrderUseCaseProxy
      .getInstance()
      .execute(+id, updateOrderDto);
  }
}
