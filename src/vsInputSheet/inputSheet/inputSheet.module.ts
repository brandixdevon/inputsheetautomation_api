import { Module } from '@nestjs/common';
import { InputSheetService } from './inputSheet.service';
import { InputSheetController } from './inputSheet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import TolerenceMatrixRepository from '../repositories/tolerenceMatrix';
import { TolerenceMatrixEntity } from './TolerenceMatrix.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TolerenceMatrixEntity])],
  controllers: [InputSheetController],
  providers: [InputSheetService, TolerenceMatrixRepository],
})
export class InputSheetModule {}
