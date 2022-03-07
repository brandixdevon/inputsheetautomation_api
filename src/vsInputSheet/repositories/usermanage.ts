import { UsermanageEntity } from './../usermanage/usermanage.enitity';
import {  Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsermanageDto } from '../usermanage/usermanage.dto';


@Injectable()
export default class UsermanageRepository {
  constructor(
    @InjectRepository(UsermanageEntity)
    private  UsermanageRepository: Repository<UsermanageEntity>,
  ) {}

  getAllUsermanage(buyer:string) :Promise<UsermanageEntity|undefined>{
    return this.UsermanageRepository.createQueryBuilder()
    .where("buyer = :buyer", {buyer})
    .select(["id", "name"]).execute();
  
  }

  getDetails(id:string) :Promise<UsermanageEntity|undefined>{
    return this.UsermanageRepository.createQueryBuilder()
    .where("id = :id", {id})
    .select(["name"]).execute();
  
  }

  createUsermanage(data :UsermanageDto) :Promise<UsermanageEntity>{
    let UsermanageCreated =  this.UsermanageRepository.create(data);
    let UsermanageToSend=  this.UsermanageRepository.save(UsermanageCreated);
    return UsermanageToSend;
  }
}
