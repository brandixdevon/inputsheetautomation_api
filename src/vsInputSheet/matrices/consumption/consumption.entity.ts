import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SupplierEntity } from '../supplier/supplier.entity';

@Entity('consumption')
export class ConsumptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  supplier: string;

  @Column()
  widthInYY: number;

  @Column()
  widthInEpixo: number;
}
