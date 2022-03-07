import { PackmethodEntity } from './../packmethod/packmethod.enitity';
import {  Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PackmethodDto } from '../packmethod/packmethod.dto';


@Injectable()
export default class PackmethodRepository {
  constructor(
    @InjectRepository(PackmethodEntity)
    private  repository: Repository<PackmethodEntity>,
  ) {}

  getAll(buyer:string) :Promise<PackmethodEntity | undefined>{
    return this.repository.createQueryBuilder()
    .where("buyer = :buyer", {buyer})
    .select(["id", "name"]).execute();
  }

  getDetails(id:string) :Promise<PackmethodEntity | undefined>{
    return this.repository.createQueryBuilder()
    .where("id = :id", {id})
    .select([ "name"]).execute();
  }

  create(data :PackmethodDto) :Promise<PackmethodEntity>{
    let created =  this.repository.create(data);
    let send=  this.repository.save(created);
    return send;
  }
}
