import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SupplierEntity } from '../supplier/supplier.entity';

@Entity('shipmentMode')
export class ShipmentModeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  mode: string;

  @ManyToOne(
    () => SupplierEntity,
    supplier => supplier.shipmentMode,
  )
  supplier: SupplierEntity;
}
