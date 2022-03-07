import { BuyerdivisionDto } from './../buyerDivision/buyerDivision.dto';
import { BuyerdivisionEntity } from './../buyerDivision/buyerDivision.enitity';
import {  Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export default class BuyerdivisionRepository {
  constructor(
    @InjectRepository(BuyerdivisionEntity)
    private  repository: Repository<BuyerdivisionEntity>,
  ) {}

  getAll(buyer:string) :Promise<BuyerdivisionEntity | undefined>{
    return this.repository.createQueryBuilder()
    .where("buyer = :buyer", {buyer})
    .select(["id", "name"]).execute();
  }

  getDetails(id:string) :Promise<BuyerdivisionEntity | undefined>{
    return this.repository.createQueryBuilder()
    .where("id = :id", {id})
    .select(["name", "code"]).execute();
  }

  create(data :BuyerdivisionDto) :Promise<BuyerdivisionEntity>{
    let created =  this.repository.create(data);
    let send=  this.repository.save(created);
    return send;
  }
}
