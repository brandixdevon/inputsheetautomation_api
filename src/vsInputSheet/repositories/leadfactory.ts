import { LeadfactoryEntity } from './../leadfactory/leadfactory.enitity';

import {  Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeadfactoryDto } from '../leadfactory/leadfactory.dto';


@Injectable()
export default class LeadfactoryRepository {
  constructor(
    @InjectRepository(LeadfactoryEntity)
    private  repository: Repository<LeadfactoryEntity>,
  ) {}

  getAll() :Promise<LeadfactoryEntity[]>{
    return this.repository.find();
  }

  getDetails(id:string) :Promise<LeadfactoryEntity | undefined>{
    return this.repository.createQueryBuilder()
    .where("id = :id", {id})
    .select([ "name"]).execute();
  }

  create(data :LeadfactoryDto) :Promise<LeadfactoryEntity>{
    let created =  this.repository.create(data);
    let send=  this.repository.save(created);
    return send;
  }
}
