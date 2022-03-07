import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { ShipmentModeEntity } from './shipmentMode.entity';

@Injectable()
export class ShipmentModeService {
  constructor(
    @InjectRepository(ShipmentModeEntity)
    private repo: Repository<ShipmentModeEntity>,
  ) {}

  async getAll(): Promise<ShipmentModeEntity[]> {
    const res = await getRepository(ShipmentModeEntity)
      .createQueryBuilder('tbl')
      .leftJoinAndSelect('tbl.supplier', 'supplier')
      .getMany();

    return res;
  }

  async getOne(data: { id: number }): Promise<ShipmentModeEntity> {
    const res = await getRepository(ShipmentModeEntity)
      .createQueryBuilder('tbl')
      .leftJoinAndSelect('tbl.supplier', 'supplier')
      .where('tbl.id = :id')
      .setParameter('id', data.id)
      .getOne();

    return res;
  }

  async getBySupplier(data: { code: string }): Promise<ShipmentModeEntity> {
    const res = await getRepository(ShipmentModeEntity)
      .createQueryBuilder('tbl')
      // .leftJoinAndSelect('tbl.supplier', 'supplier')
      .where('tbl.supplier.code = :code')
      .setParameter('code', data.code)
      .getOne();

    return res;
  }

  async add(data: {
    mode: string;
    supplier: any;
  }): Promise<ShipmentModeEntity> {
    const res = this.repo.create(data);
    await this.repo.save(res);
    return res;
  }

  async edit(data: {
    id: number;
    mode: string;
    supplier: any;
  }): Promise<ShipmentModeEntity> {
    const { id, mode, supplier } = data;
    const res = await this.repo.findOne(id);

    if (mode) res.mode = mode;
    if (id) res.id = id;
    if (supplier) res.supplier = supplier;

    await this.repo.save(res);
    return supplier;
  }

  async delete(data: { id: number }) {
    await getRepository(ShipmentModeEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();
  }
}
