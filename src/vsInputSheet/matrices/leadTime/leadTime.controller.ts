import { Body, Controller, Get, Post } from '@nestjs/common';
import { LeadTimeEntity } from './leadTime.entity';
import { LeadTimeService } from './leadTime.service';

@Controller('')
export class LeadTimeController {
  constructor(private service: LeadTimeService) {}

  @Get('/getAll')
  async getAllModes(): Promise<LeadTimeEntity[]> {
    return await this.service.getAll();
  }

  @Post('/getOne')
  async getOneMode(@Body() data: { id: number }): Promise<LeadTimeEntity> {
    return await this.service.getOne(data);
  }

  @Post('/getBySupplier')
  async getModeBySupplier(
    @Body() data: { code: string },
  ): Promise<LeadTimeEntity> {
    return await this.service.getBySupplier(data);
  }

  @Post('/add')
  async addMode(
    @Body() data: { leadTime: number; supplier: any },
  ): Promise<LeadTimeEntity> {
    return await this.service.add(data);
  }

  @Post('/edit')
  async editMode(
    @Body() data: { id: number; leadTime: number; supplier: any },
  ): Promise<LeadTimeEntity> {
    return await this.service.edit(data);
  }

  @Post('/delete')
  async deleteMode(@Body() data: { id: number }) {
    return await this.service.delete(data);
  }
}
