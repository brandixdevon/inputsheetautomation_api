import { M3buyerdivisionDto } from './m3buyerdivision.dto';
import { M3buyerdivisionEntity } from './m3buyerdivision.enitity';

import { Injectable } from '@nestjs/common';
import M3buyerdivisionRepository from '../repositories/m3buyerdivision';

@Injectable()
export class M3buyerdivisionService {
    constructor(
        private repo:M3buyerdivisionRepository,
    ){}

    getAll(buyer:string) :Promise<M3buyerdivisionEntity|undefined>{
        return this.repo.getAll(buyer);
    }

    getDetail(id:string) :Promise<M3buyerdivisionEntity|undefined>{
        return this.repo.getDetail(id);
    }

    create(data:M3buyerdivisionDto) :Promise<M3buyerdivisionEntity>{
        return this.repo.create(data);
    }
}

