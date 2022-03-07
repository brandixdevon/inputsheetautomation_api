import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity('userdetail')
export class UsermanageEntity{
    @PrimaryGeneratedColumn()
    id :number;

    @Column({type:'varchar',unique:true})
    name :string;

    @Column({type:'varchar'})
    buyer :string;
}