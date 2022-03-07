import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity('packmethod')
export class PackmethodEntity{
    @PrimaryGeneratedColumn()
    id :number;

    @Column({type:'varchar',unique:true})
    name :string;

    @Column({type:'varchar'})
    buyer :string;

}