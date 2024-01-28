import { IOrderRepository } from '../../domain/order.repository';
import { Order } from '../../domain/order.entity';

export class FindAllOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
}
