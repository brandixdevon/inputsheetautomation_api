import { MerchandiserEntity } from './merchandiser.enitity';
import { Module } from '@nestjs/common';
import {  MerchandiserController } from './merchandiser.controller';
import {  MerchandiserService } from './merchandiser.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import MerchandiserRepository from '../repositories/merchandiser';

@Module({
  imports:[ TypeOrmModule.forFeature([MerchandiserEntity])],
  controllers: [MerchandiserController],
  providers: [MerchandiserService,MerchandiserRepository]
})
export class MerchandiserModule {}
