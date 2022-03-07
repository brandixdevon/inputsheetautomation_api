import { GarmentCompositionEntity } from './../garmentComposition/garmentComposition.enitity';
import {  Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GarmentCompositionDto } from '../garmentComposition/garmentComposition.dto';


@Injectable()
export default class GarmentCompositionRepository {
  constructor(
    @InjectRepository(GarmentCompositionEntity)
    private  repository: Repository<GarmentCompositionEntity>,
  ) {}

  getAll(buyer:string) :Promise<GarmentCompositionEntity | undefined>{
    return this.repository.createQueryBuilder()
    .where("buyer = :buyer", {buyer})
    .select(["id", "name"]).execute();
  }

  getDetails(id:string) :Promise<GarmentCompositionEntity | undefined>{
    return this.repository.createQueryBuilder()
    .where("id = :id", {id})
    .select([ "name"]).execute();
  }

  create(data :GarmentCompositionDto) :Promise<GarmentCompositionEntity>{
    let created =  this.repository.create(data);
    let send=  this.repository.save(created);
    return send;
  }
}
