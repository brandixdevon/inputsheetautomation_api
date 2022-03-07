import { WarehouseDto } from './../warehouse/warehouse.dto';
import { WarehouseEntity } from './../warehouse/warehouse.enitity';
import {  Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export default class WarehouseRepository {
  constructor(
    @InjectRepository(WarehouseEntity)
    private  repository: Repository<WarehouseEntity>,
  ) {}

  getAll(buyer:string) :Promise<WarehouseEntity | undefined>{
    return this.repository.createQueryBuilder()
    .where("buyer = :buyer", {buyer})
    .select(["id", "name"]).execute();
  }

  getDetails(id:string) :Promise<WarehouseEntity | undefined>{
    return this.repository.createQueryBuilder()
    .where("id = :id", {id})
    .select(["name"]).execute();
  }

  create(data :WarehouseDto) :Promise<WarehouseEntity>{
    let created =  this.repository.create(data);
    let send=  this.repository.save(created);
    return send;
  }
}