import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('leadfactory')
export class LeadfactoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;
}
