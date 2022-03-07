import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { WarehouseEntity } from './warehouse.enitity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import WarehouseRepository from '../repositories/warehouse';

@Module({
  imports:[ TypeOrmModule.forFeature([WarehouseEntity])],
  controllers: [WarehouseController],
  providers: [WarehouseService,WarehouseRepository]
})
export class WarehouseModule {}
