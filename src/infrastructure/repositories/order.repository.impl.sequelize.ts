import { IOrderRepository } from '../../domain/order.repository';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { OrderModel } from '../models/order.model';
import { Order } from '../../domain/order.entity';
import { UpdateOrderDto } from 'src/presentations/dto/update-order.dto';

@Injectable()
export class OrderRepositorySequelize implements IOrderRepository {
  constructor(
    @InjectModel(OrderModel)
    private orderModel: typeof OrderModel,
  ) {}

  async create(order: Order): Promise<Order> {
    const newOrder = await this.orderModel.create(order);
    order.status = newOrder.status;
    order.user_id = newOrder.user_id;
    order.id = newOrder.id;
    order.products = newOrder.products;
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel.findByPk(id);

    if (!order) {
      throw new Error('Produto não encontrado');
    }
    await order.update(updateOrderDto);
    return order;
  }

  async findAll(): Promise<any> {
    const ordersModels = await this.orderModel.findAll({
      where: {
        status: ['Pronto', 'Em Preparação', 'Recebido'],
      },
      order: ['status', 'DESC'],
    });
    return ordersModels;
  }

  async findByPk(id: number) {
    const order = await this.orderModel.findByPk(id);
    return order;
  }

  async findAllWithProducts() {
    const orders = await this.orderModel.findAll({});
    return orders;
  }
}
