import { Model } from 'sequelize-typescript';
import { Column, Table, DataType } from 'sequelize-typescript';

export type ListAttributes = {
  id: number;
  status: string;
  user_id: string;
  payment_status: string;
  products: object;
};

@Table({ tableName: 'orders' })
export class OrderModel extends Model<ListAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  status: string;

  @Column
  user_id: string;

  @Column({
    type: DataType.JSON, // Defina o tipo de dados como JSON
  })
  products: object;
}
