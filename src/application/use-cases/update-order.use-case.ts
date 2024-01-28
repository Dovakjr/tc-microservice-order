import { IOrderRepository } from '../../domain/order.repository';
import { Order } from '../../domain/order.entity';
import { UpdateOrderDto } from '../../presentations/dto/update-order.dto';
export class UpdateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderRepository.update(id, updateOrderDto);
  }
}
