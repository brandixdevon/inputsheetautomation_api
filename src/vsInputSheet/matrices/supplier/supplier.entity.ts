import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { LeadTimeEntity } from '../leadTime/leadTime.entity';
import { ShipmentModeEntity } from '../shipmentMode/shipmentMode.entity';

@Entity('supplier')
export class SupplierEntity {
  @PrimaryColumn()
  code: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @OneToMany(
    () => LeadTimeEntity,
    leadTime => leadTime.supplier,
  )
  leadTime: LeadTimeEntity;

  @OneToMany(
    () => ShipmentModeEntity,
    shipmentMode => shipmentMode.supplier,
  )
  shipmentMode: ShipmentModeEntity;
}
