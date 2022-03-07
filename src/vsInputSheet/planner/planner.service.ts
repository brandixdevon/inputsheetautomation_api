import { PlannerDto } from './planner.dto';
import { PlannerEntity } from './planner.enitity';
import { Injectable } from '@nestjs/common';
import PlannerRepository from '../repositories/planner';

@Injectable()
export class PlannerService {
    constructor(
        private plannerRepo:PlannerRepository,
    ){}

    getAllPlanners(buyer:string) :Promise<PlannerEntity|undefined>{
        return this.plannerRepo.getAllPlanners(buyer);
    }

    getDetails(id:string) :Promise<PlannerEntity|undefined>{
        return this.plannerRepo.getDetails(id);
    }

    createPlanner(data:PlannerDto) :Promise<PlannerEntity>{
        return this.plannerRepo.createPlanner(data);
    }
}
