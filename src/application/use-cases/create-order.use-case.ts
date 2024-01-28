import { IOrderRepository } from '../../domain/order.repository'; // Importe a interface do repositório
import { CreateOrderDto } from '../../presentations/dto/create-order.dto';
import { Order } from '../../domain/order.entity';

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(data: CreateOrderDto): Promise<Order> {
    //Create new order
    const order = new Order('Recebido', data.user_id, data.products);
    return this.orderRepository.create(order);
  }
}
