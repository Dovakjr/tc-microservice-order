export interface IOrderWebhookService {
  getPaymentStatus(payload: any): Promise<any>;
}
