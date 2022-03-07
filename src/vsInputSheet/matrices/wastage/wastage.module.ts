import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WastageController } from './wastage.controller';
import { WastageEntity } from './wastage.entity';
import { WastageService } from './wastage.service';

@Module({
  imports: [TypeOrmModule.forFeature([WastageEntity])],
  controllers: [WastageController],
  providers: [WastageService],
  exports: [WastageService],
})
export class WastageModule {}
