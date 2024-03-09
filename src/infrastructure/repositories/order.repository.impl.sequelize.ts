import { IOrderRepository } from '../../domain/order.repository';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { OrderModel } from '../models/order.model';
import { Order } from '../../domain/order.entity';
import { UpdateOrderDto } from 'src/presentations/dto/update-order.dto';
import { PubSubService } from '../services/pub-sub.service';

@Injectable()
export class OrderRepositorySequelize implements IOrderRepository {
  constructor(
    @InjectModel(OrderModel)
    private orderModel: typeof OrderModel,
    private readonly pubSubService: PubSubService,
  ) {
    this.subscribeToOrderEvents();
  }

  private decodeBase64(base64String: string): string {
    // Decodificar a string base64 de volta ao valor original
    return Buffer.from(base64String, 'base64').toString();
  }

  async create(order: Order): Promise<Order> {
    const newOrder = await this.orderModel.create(order);
    order.status = newOrder.status;
    order.user_id = newOrder.user_id;
    order.id = newOrder.id;
    order.products = newOrder.products;

    await this.pubSubService.publishMessage(
      'projects/techchallenge-fastfood/topics/new_order_payment',
      order,
    );

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

  private async subscribeToOrderEvents() {
    try {
      await this.pubSubService.subscribe(
        'projects/techchallenge-fastfood/subscriptions/order_queue-sub',
        (message) => {
          //Manage message base64 decoding
          const messageData = message.data;
          const string64 = this.decodeBase64(messageData);
          const originalString = this.decodeBase64(string64);
          const originalJson = JSON.parse(originalString);

          //Update order status if the order is paid
          this.update(originalJson.id, { status: 'Recebido' });
        },
      );
      console.log('Subscribed to order_queue-sub successfully.');
    } catch (error) {
      console.error('Error subscribing to order_queue-sub:', error);
    }
  }
}
