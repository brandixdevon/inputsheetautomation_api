import { LeadfactoryEntity } from './leadfactory.enitity';
import { LeadfactoryDto } from './leadfactory.dto';
import { Injectable } from '@nestjs/common';
import LeadfactoryRepository from '../repositories/leadfactory';

@Injectable()
export class LeadfactoryService {
    constructor(
        private repo:LeadfactoryRepository,
    ){}

    getAll() :Promise<LeadfactoryEntity[]>{
        return this.repo.getAll();
    }

    getDetails(id:string) :Promise<LeadfactoryEntity | undefined>{
        return this.repo.getDetails(id);
    }

    create(data:LeadfactoryDto) :Promise<LeadfactoryEntity>{
        return this.repo.create(data);
    }
}

