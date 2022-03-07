import { WarehouseDto } from './warehouse.dto';
import { WarehouseEntity } from './warehouse.enitity';

import { Injectable } from '@nestjs/common';
import WarehouseRepository from '../repositories/warehouse';

@Injectable()
export class WarehouseService {
    constructor(
        private repo:WarehouseRepository,
    ){}

    getAll(buyer:string) :Promise<WarehouseEntity|undefined>{
        return this.repo.getAll(buyer);
    }

    getDetails(id:string) :Promise<WarehouseEntity|undefined>{
        return this.repo.getDetails(id);
    }

    create(data:WarehouseDto) :Promise<WarehouseEntity>{
        return this.repo.create(data);
    }
}

