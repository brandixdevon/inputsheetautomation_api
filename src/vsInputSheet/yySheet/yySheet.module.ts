import { Module } from '@nestjs/common';
import { YYSheetController } from './yySheet.controller';
import { YYSheetService } from './yySheet.service';

@Module({
  controllers: [YYSheetController],
  providers: [YYSheetService],
})
export class YYSheetModule {}
