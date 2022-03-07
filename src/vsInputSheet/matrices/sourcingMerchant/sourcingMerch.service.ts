import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { SourcingMerchEntity } from './sourcingMerch.entity';

@Injectable()
export class SourcingMercService {
  constructor(
    @InjectRepository(SourcingMerchEntity)
    private repo: Repository<SourcingMerchEntity>,
  ) {}

  async getAll(): Promise<SourcingMerchEntity[]> {
    return this.repo.find();
  }

  async getOne(data: { id: number }): Promise<SourcingMerchEntity> {
    const res = await getRepository(SourcingMerchEntity)
      .createQueryBuilder('tbl')
      .where('tbl.id = :id')
      .setParameter('id', data.id)
      .getOne();

    return res;
  }

  async getByProdCode(data: { code: string }): Promise<SourcingMerchEntity> {
    const res = await getRepository(SourcingMerchEntity)
      .createQueryBuilder('tbl')
      .where('tbl.productGroupCode = :code')
      .setParameter('code', data.code)
      .getOne();

    return res;
  }

  async add(data: {
    merchant: string;
    productGroupCode: string;
    productGroupDesc: string;
  }): Promise<SourcingMerchEntity> {
    const res = this.repo.create(data);
    await this.repo.save(res);
    return res;
  }

  async edit(data: {
    id: number;
    merchant: string;
    productGroupCode: string;
    productGroupDesc: string;
  }): Promise<SourcingMerchEntity> {
    const { id, merchant, productGroupCode, productGroupDesc } = data;
    const res = await this.repo.findOne(id);

    if (id) res.id = id;
    if (merchant) res.merchant = merchant;
    if (productGroupCode) res.productGroupCode = productGroupCode;
    if (productGroupDesc) res.productGroupDesc = productGroupDesc;

    await this.repo.save(res);
    return res;
  }

  async delete(data: { id: number }) {
    await getRepository(SourcingMerchEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();
  }
}
