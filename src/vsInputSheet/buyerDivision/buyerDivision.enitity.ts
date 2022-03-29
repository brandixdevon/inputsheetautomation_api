import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity('buyerdivision')
export class BuyerdivisionEntity{
    @PrimaryGeneratedColumn()
    id :number;

    @Column({type:'varchar'})
    name :string;

    @Column({type:'varchar'})
    buyer :string;

    @Column({type:'varchar'})
    code :string;
}