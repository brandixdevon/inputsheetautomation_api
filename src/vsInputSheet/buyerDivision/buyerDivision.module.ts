import { BuyerdivisionController } from './buyerDivision.controller';
import { BuyerdivisionService } from './buyerDivision.service';
import { BuyerdivisionEntity } from './buyerDivision.enitity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BuyerdivisionRepository from '../repositories/buyerDivision';

@Module({
  imports:[ TypeOrmModule.forFeature([BuyerdivisionEntity])],
  controllers: [BuyerdivisionController],
  providers: [BuyerdivisionService,BuyerdivisionRepository]
})
export class BuyerdivisionModule {}
