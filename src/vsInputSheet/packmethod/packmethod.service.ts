
import { Injectable } from '@nestjs/common';
import PackmethodRepository from '../repositories/packmethod';
import { PackmethodEntity } from './packmethod.enitity';
import { PackmethodDto } from './packmethod.dto';

@Injectable()
export class PackmethodService {
    constructor(
        private repo:PackmethodRepository,
    ){}

    getAll(buyer:string) :Promise<PackmethodEntity|undefined>{
        return this.repo.getAll(buyer);
    }

    getDetails(id:string) :Promise<PackmethodEntity|undefined>{
        return this.repo.getDetails(id);
    }

    create(data:PackmethodDto) :Promise<PackmethodEntity>{
        return this.repo.create(data);
    }
}