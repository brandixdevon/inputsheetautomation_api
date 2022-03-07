import { UsermanageDto } from './usermanage.dto';
import { UsermanageEntity } from './usermanage.enitity';

import { Injectable } from '@nestjs/common';
import UsermanageRepository from '../repositories/usermanage';

@Injectable()
export class UsermanageService {
    constructor(
        private repo:UsermanageRepository,
    ){}

    getAll(buyer:string) :Promise<UsermanageEntity|undefined>{
        return this.repo.getAllUsermanage(buyer);
    }

    getDetails(id:string) :Promise<UsermanageEntity|undefined>{
        return this.repo.getDetails(id);
    }

    create(data:UsermanageDto) :Promise<UsermanageEntity>{
        return this.repo.createUsermanage(data);
    }
}

