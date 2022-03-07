import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourcingMerchController } from './sourcingMerch.controller';
import { SourcingMerchEntity } from './sourcingMerch.entity';
import { SourcingMercService } from './sourcingMerch.service';

@Module({
  imports: [TypeOrmModule.forFeature([SourcingMerchEntity])],
  controllers: [SourcingMerchController],
  providers: [SourcingMercService],
  exports: [SourcingMercService],
})
export class SourcingMerchModule {}
