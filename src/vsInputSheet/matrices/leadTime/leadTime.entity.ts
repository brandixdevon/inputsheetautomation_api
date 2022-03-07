import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SupplierEntity } from '../supplier/supplier.entity';

@Entity('leadTime')
export class LeadTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  leadTime: number;

  @ManyToOne(
    () => SupplierEntity,
    supplier => supplier.leadTime,
  )
  supplier: SupplierEntity;
}
