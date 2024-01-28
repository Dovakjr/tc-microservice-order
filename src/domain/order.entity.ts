export class Order {
  id: number;
  status: string;
  user_id: string;
  products: object;

  constructor(status: string, user_id: string, products: object) {
    this.status = status;
    this.user_id = user_id;
    this.products = products;
  }
}
