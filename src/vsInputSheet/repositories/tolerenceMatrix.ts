import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TolerenceMatrixEntity } from '../inputSheet/TolerenceMatrix.entity';

@Injectable()
export default class TolerenceMatrixRepository {
  constructor(
    @InjectRepository(TolerenceMatrixEntity)
    private repository: Repository<TolerenceMatrixEntity>,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async deleteTolerence(id: number) {
    return await this.repository.delete(id);
  }

  async addTolerence(tolerence: {
    id: number;
    supplier: string;
    supplier_code: string;
    proc_group: string;
    rm_color: string;
    tolerence: string;
  }) {
    let newtolerence = this.repository.create(tolerence);
    this.repository.save(newtolerence);
  }
}
