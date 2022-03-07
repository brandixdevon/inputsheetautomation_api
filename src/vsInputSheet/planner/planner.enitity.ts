import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity('planners')
export class PlannerEntity{
    @PrimaryGeneratedColumn()
    id :number;

    @Column({type:'varchar'})
    buyer :string;

    @Column({type:'varchar'})
    name :string;

}