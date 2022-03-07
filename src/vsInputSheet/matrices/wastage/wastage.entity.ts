import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wastage')
export class WastageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  wastage: string;

  @Column({ type: 'varchar', unique: true })
  productGroupCode: string;

  @Column({ type: 'varchar', unique: true })
  productGroupDesc: string;
}
