import { LeadfactoryController } from './leadfactory.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadfactoryEntity } from './leadfactory.enitity';
import { LeadfactoryService } from './leadfactory.service';
import LeadfactoryRepository from '../repositories/leadfactory';

@Module({
  imports:[ TypeOrmModule.forFeature([LeadfactoryEntity])],
  controllers: [LeadfactoryController],
  providers: [LeadfactoryService,LeadfactoryRepository]
})
export class LeadfactoryModule {}
