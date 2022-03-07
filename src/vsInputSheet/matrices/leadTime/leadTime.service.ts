import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { LeadTimeEntity } from './leadTime.entity';

@Injectable()
export class LeadTimeService {
  constructor(
    @InjectRepository(LeadTimeEntity)
    private repo: Repository<LeadTimeEntity>,
  ) {}

  async getAll(): Promise<LeadTimeEntity[]> {
    const res = await getRepository(LeadTimeEntity)
      .createQueryBuilder('tbl')
      .leftJoinAndSelect('tbl.supplier', 'supplier')
      .getMany();

    return res;
  }

  async getOne(data: { id: number }): Promise<LeadTimeEntity> {
    const res = await getRepository(LeadTimeEntity)
      .createQueryBuilder('tbl')
      .leftJoinAndSelect('tbl.supplier', 'supplier')
      .where('tbl.id = :id')
      .setParameter('id', data.id)
      .getOne();

    return res;
  }

  async getBySupplier(data: { code: string }): Promise<LeadTimeEntity> {
    const res = await getRepository(LeadTimeEntity)
      .createQueryBuilder('tbl')
      // .leftJoinAndSelect('tbl.supplier', 'supplier')
      .where('tbl.supplier.code = :code')
      .setParameter('code', data.code)
      .getOne();

    return res;
  }

  async add(data: {
    leadTime: number;
    supplier: any;
  }): Promise<LeadTimeEntity> {
    const res = this.repo.create(data);
    await this.repo.save(res);
    return res;
  }

  async edit(data: {
    id: number;
    leadTime: number;
    supplier: any;
  }): Promise<LeadTimeEntity> {
    const { id, leadTime, supplier } = data;
    const res = await this.repo.findOne(id);

    if (leadTime) res.leadTime = leadTime;
    if (id) res.id = id;
    if (supplier) res.supplier = supplier;

    await this.repo.save(res);
    return supplier;
  }

  async delete(data: { id: number }) {
    await getRepository(LeadTimeEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();
  }
}
