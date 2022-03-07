import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { SupplierEntity } from './supplier.entity';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity)
    private repo: Repository<SupplierEntity>,
  ) {}

  async getAll(): Promise<SupplierEntity[]> {
    const res = await getRepository(SupplierEntity)
      .createQueryBuilder('tbl')
      .leftJoinAndSelect('tbl.leadTime', 'leadTime')
      .leftJoinAndSelect('tbl.shipmentMode', 'shipmentMode')
      .getMany();

    return res;
  }

  async getOne(data: { code: string }): Promise<SupplierEntity> {
    const res = await getRepository(SupplierEntity)
      .createQueryBuilder('tbl')
      .leftJoinAndSelect('tbl.leadTime', 'leadTime')
      .leftJoinAndSelect('tbl.shipmentMode', 'shipmentMode')
      .where('tbl.code = :code')
      .setParameter('code', data.code)
      .getOne();

    return res;
  }

  async add(data: { code: string; name: string }): Promise<SupplierEntity> {
    const res = this.repo.create(data);
    await this.repo.save(res);
    return res;
  }

  async edit(data: { code: string; name: string }): Promise<SupplierEntity> {
    const { code, name } = data;
    const supplier = await this.repo.findOne(code);

    if (name) supplier.name = name;
    if (code) supplier.code = code;

    await this.repo.save(supplier);
    return supplier;
  }

  async delete(data: { code: string }) {
    await getRepository(SupplierEntity)
      .createQueryBuilder()
      .delete()
      .where('code = :code')
      .setParameter('code', data.code)
      .execute();
  }
}
