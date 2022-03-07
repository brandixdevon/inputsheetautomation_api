import { M3buyerdivisionController } from './m3buyerdivision.controller';
import { M3buyerdivisionService } from './m3buyerdivision.service';
import { M3buyerdivisionEntity } from './m3buyerdivision.enitity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import M3buyerdivisionRepository from '../repositories/m3buyerdivision';

@Module({
  imports:[ TypeOrmModule.forFeature([M3buyerdivisionEntity])],
  controllers: [M3buyerdivisionController],
  providers: [M3buyerdivisionService,M3buyerdivisionRepository]
})
export class M3buyerdivisionModule {}
