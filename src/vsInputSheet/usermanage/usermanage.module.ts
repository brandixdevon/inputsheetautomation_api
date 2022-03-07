import { UsermanageController } from './usermanage.controller';
import { UsermanageService } from './usermanage.service';
import { UsermanageEntity } from './usermanage.enitity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsermanageRepository from '../repositories/usermanage';

@Module({
  imports:[ TypeOrmModule.forFeature([UsermanageEntity])],
  controllers: [UsermanageController],
  providers: [UsermanageService,UsermanageRepository]
})
export class UsermanageModule {}
