import { PackmethodEntity } from './packmethod.enitity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackmethodController } from './packmethod.controller';
import { PackmethodService } from './packmethod.service';
import PackmethodRepository from '../repositories/packmethod';

@Module({
  imports:[ TypeOrmModule.forFeature([PackmethodEntity])],
  controllers: [PackmethodController],
  providers: [PackmethodService,PackmethodRepository]
})
export class PackmethodModule {}
