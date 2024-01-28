import { Order } from './order.entity';
import { UpdateOrderDto } from 'src/presentations/dto/update-order.dto';
export interface IOrderRepository {
  create(order: Order): Promise<any>;
  findAll(): Promise<Order[]>;
  findByPk(id: number): Promise<Order>;
  findAllWithProducts(): Promise<any[]>;
  update(id: number, updateProductDto: UpdateOrderDto): Promise<Order>;
}
