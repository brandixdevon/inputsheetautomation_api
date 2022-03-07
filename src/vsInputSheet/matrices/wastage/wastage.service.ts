import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { WastageEntity } from './wastage.entity';

@Injectable()
export class WastageService {
  constructor(
    @InjectRepository(WastageEntity)
    private repo: Repository<WastageEntity>,
  ) {}

  async getAll(): Promise<WastageEntity[]> {
    return this.repo.find();
  }

  async getOne(data: { id: number }): Promise<WastageEntity> {
    const res = await getRepository(WastageEntity)
      .createQueryBuilder('tbl')
      .where('tbl.id = :id')
      .setParameter('id', data.id)
      .getOne();

    return res;
  }

  async getByProdCode(data: { code: string }): Promise<WastageEntity> {
    const res = await getRepository(WastageEntity)
      .createQueryBuilder('tbl')
      .where('tbl.productGroupCode = :code')
      .setParameter('code', data.code)
      .getOne();

    return res;
  }

  async add(data: {
    wastage: string;
    productGroupCode: string;
    productGroupDesc: string;
  }): Promise<WastageEntity> {
    const res = this.repo.create(data);
    await this.repo.save(res);
    return res;
  }

  async edit(data: {
    id: number;
    wastage: string;
    productGroupCode: string;
    productGroupDesc: string;
  }): Promise<WastageEntity> {
    const { id, wastage, productGroupCode, productGroupDesc } = data;
    const res = await this.repo.findOne(id);

    if (id) res.id = id;
    if (wastage) res.wastage = wastage;
    if (productGroupCode) res.productGroupCode = productGroupCode;
    if (productGroupDesc) res.productGroupDesc = productGroupDesc;

    await this.repo.save(res);
    return res;
  }

  async delete(data: { id: number }) {
    await getRepository(WastageEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();
  }
}
