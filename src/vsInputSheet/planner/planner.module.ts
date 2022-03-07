import { PlannerService } from './planner.service';
import { PlannerEntity } from './planner.enitity';
import { Module } from '@nestjs/common';
import {  PlannerController } from './planner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import PlannerRepository from '../repositories/planner';

@Module({
  imports:[ TypeOrmModule.forFeature([PlannerEntity])],
  controllers: [PlannerController],
  providers: [PlannerService,PlannerRepository]
})
export class PlannerModule {}
