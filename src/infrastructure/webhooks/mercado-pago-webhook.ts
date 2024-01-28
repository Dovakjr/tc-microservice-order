import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IOrderWebhookService } from 'src/domain/order.webhooks';

@Injectable()
export class MercadoPagoWebhook implements IOrderWebhookService {
  async getPaymentStatus(id: number): Promise<any> {
    try {
      const response = await axios.post(
        'https://api.mercadopago.com/v1/payments/' + id.toString(),
      );
      //Mock
      return {
        id: 1,
        date_created: '2023-08-31T11:26:38.000Z',
        date_approved: '2023-08-31T11:26:38.000Z',
        date_last_updated: '2023-08-31T11:26:38.000Z',
        money_release_date: '2023-09-14T11:26:38.000Z',
        payment_method_id: 'account_money',
        payment_type_id: 'credit_card',
        status: 'approved',
        status_detail: 'accredited',
        currency_id: 'BRL',
        description: 'Burguer Clássico',
        collector_id: 2,
        payer: {
          id: 123,
          email: 'mateusdev@gmail.com',
          identification: {
            type: 'DNI',
            number: 12345678,
          },
          type: 'customer',
        },
        metadata: {},
        additional_info: {},
        transaction_amount: 25,
        transaction_amount_refunded: 0,
        coupon_amount: 0,
        transaction_details: {
          net_received_amount: 25,
          total_paid_amount: 25,
          overpaid_amount: 0,
          installment_amount: 25,
        },
        installments: 1,
        card: {},
      };
    } catch (error) {
      throw new Error('Falha ao obter dados de pagamento');
    }
  }
}
