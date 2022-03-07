import { MerchandiserDto } from './merchandiser.dto';
import { MerchandiserEntity } from './merchandiser.enitity';
import { Injectable } from '@nestjs/common';
import MerchandiserRepository from '../repositories/merchandiser';

@Injectable()
export class MerchandiserService {
    constructor(
        private merchandiserRepo:MerchandiserRepository,
    ){}

    getAllMerchandisers(buyer:string) :Promise<MerchandiserEntity|undefined>{
        return this.merchandiserRepo.getAllMerchandisers(buyer);
    }

    getDetails(id:string) :Promise<MerchandiserEntity|undefined>{
        return this.merchandiserRepo.getDetails(id);
    }

    createMerchandiser(data:MerchandiserDto) :Promise<MerchandiserEntity>{
        return this.merchandiserRepo.createMerchandiser(data);
    }
}
