import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity('garmentComposition')
export class GarmentCompositionEntity{
    @PrimaryGeneratedColumn()
    id :number;

    @Column({type:'varchar',unique:true})
    name :string;

    @Column({type:'varchar'})
    buyer :string;

}