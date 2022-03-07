import { Body, Controller, Post, Query } from '@nestjs/common';
import { YYSheetService } from './yySheet.service';

@Controller('')
export class YYSheetController {
  constructor(private service: YYSheetService) {}
  @Post('getYYData')
  getRMColor(@Body() data: { isPink: boolean; style: string; bom: string }) {
    return this.service.getYYDataset(data.isPink, data.style, data.bom);
  }
}
