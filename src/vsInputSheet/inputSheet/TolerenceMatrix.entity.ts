import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('tolerencematrix')
@Unique('index_name', ['supplier_code', 'proc_group', 'rm_color'])
export class TolerenceMatrixEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  supplier: string;

  @Column()
  supplier_code: string;

  @Column()
  proc_group: string;

  @Column()
  rm_color: string;

  @Column()
  tolerence: string;
}
