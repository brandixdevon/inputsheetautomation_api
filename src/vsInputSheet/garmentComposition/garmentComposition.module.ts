import { GarmentCompositionEntity } from './garmentComposition.enitity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GarmentCompositionController } from './garmentComposition.controller';
import { GarmentCompositionService } from './garmentComposition.service';
import GarmentCompositionRepository from '../repositories/garmentComposition';

@Module({
  imports:[ TypeOrmModule.forFeature([GarmentCompositionEntity])],
  controllers: [GarmentCompositionController],
  providers: [GarmentCompositionService,GarmentCompositionRepository]
})
export class GarmentCompositionModule {}
