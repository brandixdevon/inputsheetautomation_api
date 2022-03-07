import { MerchandiserDto } from './../merchandiser/merchandiser.dto';
import { MerchandiserEntity } from './../merchandiser/merchandiser.enitity';
import {  Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export default class MerchandiserRepository {
  constructor(
    @InjectRepository(MerchandiserEntity)
    private  merchandiserRepository: Repository<MerchandiserEntity>,
  ) {}

  getAllMerchandisers(buyer:string) :Promise<MerchandiserEntity | undefined>{
    return this.merchandiserRepository.createQueryBuilder()
    .where("buyer = :buyer", {buyer})
    .select(["id", "name"]).execute();
  }

  getDetails(id:string) :Promise<MerchandiserEntity | undefined>{
    return this.merchandiserRepository.createQueryBuilder()
    .where("id = :id", {id})
    .select(["name"]).execute();
  }

  createMerchandiser(data :MerchandiserDto) :Promise<MerchandiserEntity>{
    let merchandiserCreated =  this.merchandiserRepository.create(data);
    let merchandiserToSend=  this.merchandiserRepository.save(merchandiserCreated);
    return merchandiserToSend;
  }
}
