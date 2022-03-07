
import { Injectable } from '@nestjs/common';
import GarmentCompositionRepository from '../repositories/garmentComposition';
import { GarmentCompositionEntity } from './garmentComposition.enitity';
import { GarmentCompositionDto } from './garmentComposition.dto';

@Injectable()
export class GarmentCompositionService {
    constructor(
        private repo:GarmentCompositionRepository,
    ){}

    getAll(buyer:string) :Promise<GarmentCompositionEntity|undefined>{
        return this.repo.getAll(buyer);
    }

    getDetails(id:string) :Promise<GarmentCompositionEntity|undefined>{
        return this.repo.getDetails(id);
    }

    create(data:GarmentCompositionDto) :Promise<GarmentCompositionEntity>{
        return this.repo.create(data);
    }
}