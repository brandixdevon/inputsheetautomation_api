import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity('m3buyerdividion')
export class M3buyerdivisionEntity{
    @PrimaryGeneratedColumn()
    id :number;

    @Column({type:'varchar'})
    name :string;
 
    @Column({type:'varchar'})
    buyer :string;

    @Column({type:'varchar'})
    gtc :string;
}