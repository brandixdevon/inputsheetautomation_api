import { M3buyerdivisionDto } from './../m3buyerdivision/m3buyerdivision.dto';
import { M3buyerdivisionEntity } from './../m3buyerdivision/m3buyerdivision.enitity';
import {  Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export default class WarehouseRepository {
  constructor(
    @InjectRepository(M3buyerdivisionEntity)
    private  repository: Repository<M3buyerdivisionEntity>,
  ) {}

  getAll(buyer:string) :Promise<M3buyerdivisionEntity | undefined>{
    return this.repository.createQueryBuilder()
    .where("buyer = :buyer", {buyer})
    .select(["id", "name"]).execute();
  }

  getDetail(id:string) :Promise<M3buyerdivisionEntity | undefined>{
    return this.repository.createQueryBuilder()
    .where("id = :id", {id})
    .select(["name", "gtc"]).execute();
  }

  create(data :M3buyerdivisionDto) :Promise<M3buyerdivisionEntity>{
    let created =  this.repository.create(data);
    let send=  this.repository.save(created);
    return send;
  }
}
