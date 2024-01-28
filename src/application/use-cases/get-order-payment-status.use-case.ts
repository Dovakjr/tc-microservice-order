import { Order } from '../../domain/order.entity';
import { IOrderWebhookService } from 'src/domain/order.webhooks';

export class GetOrderPaymentStatus {
  constructor(private readonly orderWebhook: IOrderWebhookService) {}

  async execute(id: number): Promise<Order> {
    return await this.orderWebhook.getPaymentStatus(id);
  }
}
