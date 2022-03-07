import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentModeController } from './shipmentMode.controller';
import { ShipmentModeEntity } from './shipmentMode.entity';
import { ShipmentModeService } from './shipmentMode.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShipmentModeEntity])],
  controllers: [ShipmentModeController],
  providers: [ShipmentModeService],
  exports: [ShipmentModeService],
})
export class ShipmentModeModule {}
