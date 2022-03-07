import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadTimeController } from './leadTime.controller';
import { LeadTimeEntity } from './leadTime.entity';
import { LeadTimeService } from './leadTime.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeadTimeEntity])],
  controllers: [LeadTimeController],
  providers: [LeadTimeService],
  exports: [LeadTimeService],
})
export class LeadTimeModule {}
