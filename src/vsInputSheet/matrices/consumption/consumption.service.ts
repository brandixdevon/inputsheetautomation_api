import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { ConsumptionEntity } from './consumption.entity';

@Injectable()
export class ConsupmtionService {
  constructor(
    @InjectRepository(ConsumptionEntity)
    private repo: Repository<ConsumptionEntity>,
  ) {}

  private readonly logger = new Logger(ConsupmtionService.name);

  async getAll(): Promise<ConsumptionEntity[]> {
    this.logger.log(`Start getting all consumptions `);
    const res = await this.repo.find();
    this.logger.log(`Successfully returned all consumptions `);
    return res;
  }

  async add(data: {
    supplier: string;
    widthInYY: number;
    widthInEpixo: number;
  }): Promise<ConsumptionEntity> {
    this.logger.log(`Adding details for ${data.supplier}`);
    const res = this.repo.create(data);
    await this.repo.save(res);
    this.logger.log(`Successfully added details for ${data.supplier}`);
    return res;
  }

  async edit(data: {
    id: number;
    supplier: string;
    widthInYY: number;
    widthInEpixo: number;
  }): Promise<ConsumptionEntity> {
    this.logger.log(`Updating details for ${data.supplier}`);
    const { id, supplier, widthInYY, widthInEpixo } = data;

    const res = await this.repo.findOne(id);

    if (supplier) res.supplier = supplier;
    if (widthInYY) res.widthInYY = widthInYY;
    if (widthInEpixo) res.widthInEpixo = widthInEpixo;

    await this.repo.save(res);
    this.logger.log(`Successfully updated details for ${data.supplier}`);
    return res;
  }

  async delete(data: { id: number }) {
    await getRepository(ConsumptionEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();
  }
}
