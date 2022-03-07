import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConsumptionEntity } from './consumption.entity';
import { ConsupmtionService } from './consumption.service';

@Controller('')
export class ConsumptionController {
  constructor(private service: ConsupmtionService) {}

  @Get('/getAll')
  async getAllConsumptions(): Promise<ConsumptionEntity[]> {
    return await this.service.getAll();
  }

  @Post('/add')
  async addConsumption(
    @Body() data: { supplier: string; widthInYY: number; widthInEpixo: number },
  ): Promise<ConsumptionEntity> {
    return await this.service.add(data);
  }

  @Post('/edit')
  async editConsumption(
    @Body()
    data: {
      id: number;
      supplier: string;
      widthInYY: number;
      widthInEpixo: number;
    },
  ): Promise<ConsumptionEntity> {
    return await this.service.edit(data);
  }

  @Post('/delete')
  async deleteConsumption(@Body() data: { id: number }) {
    return await this.service.delete(data);
  }
}
