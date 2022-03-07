import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity('merchandisers')
export class MerchandiserEntity{
    @PrimaryGeneratedColumn()
    id :number;

    @Column({type:'varchar'})
    buyer :string;

    @Column({type:'varchar'})
    name :string;

}