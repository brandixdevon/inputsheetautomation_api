import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity('warehouse')
export class WarehouseEntity{
    @PrimaryGeneratedColumn()
    id :number;

    @Column({type:'varchar',unique:true})
    name :string;

    @Column({type:'varchar'})
    buyer :string;
}