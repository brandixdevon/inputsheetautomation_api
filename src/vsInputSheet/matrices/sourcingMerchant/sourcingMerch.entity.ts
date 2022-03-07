import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sourcingMerch')
export class SourcingMerchEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  merchant: string;

  @Column({ type: 'varchar', unique: true })
  productGroupCode: string;

  @Column({ type: 'varchar', unique: true })
  productGroupDesc: string;
}
