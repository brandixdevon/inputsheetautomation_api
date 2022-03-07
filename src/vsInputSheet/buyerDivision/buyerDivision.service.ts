import { BuyerdivisionDto } from './buyerDivision.dto';
import { BuyerdivisionEntity } from './buyerDivision.enitity';

import { Injectable } from '@nestjs/common';
import BuyerdivisionRepository from '../repositories/buyerDivision';

@Injectable()
export class BuyerdivisionService {
    constructor(
        private repo:BuyerdivisionRepository,
    ){}

    getAll(buyer:string) :Promise<BuyerdivisionEntity|undefined>{
        return this.repo.getAll(buyer);
    }

    getDetails(id:string) :Promise<BuyerdivisionEntity|undefined>{
        return this.repo.getDetails(id);
    }

    create(data:BuyerdivisionDto) :Promise<BuyerdivisionEntity>{
        return this.repo.create(data);
    }
}

