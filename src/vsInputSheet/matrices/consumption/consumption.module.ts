import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumptionController } from './consumption.controller';
import { ConsumptionEntity } from './consumption.entity';
import { ConsupmtionService } from './consumption.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumptionEntity])],
  controllers: [ConsumptionController],
  providers: [ConsupmtionService],
  exports: [ConsupmtionService],
})
export class ConsumptionModule {}
