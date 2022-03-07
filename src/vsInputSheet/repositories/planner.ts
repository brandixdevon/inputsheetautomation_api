import { PlannerEntity } from './../planner/planner.enitity';
import {  Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlannerDto } from '../planner/planner.dto';


@Injectable()
export default class PlannerRepository {
  constructor(
    @InjectRepository(PlannerEntity)
    private  plannerRepository: Repository<PlannerEntity>,
  ) {}

  getAllPlanners(buyer:string) :Promise<PlannerEntity|undefined>{
    return this.plannerRepository.createQueryBuilder()
    .where("buyer = :buyer", {buyer})
    .select(["id", "name"]).execute();
  
  }

  getDetails(id:string) :Promise<PlannerEntity|undefined>{
    return this.plannerRepository.createQueryBuilder()
    .where("id = :id", {id})
    .select(["name"]).execute();
  
  }

  createPlanner(data :PlannerDto) :Promise<PlannerEntity>{
    let plannerCreated =  this.plannerRepository.create(data);
    let plannerToSend=  this.plannerRepository.save(plannerCreated);
    return plannerToSend;
  }
}
