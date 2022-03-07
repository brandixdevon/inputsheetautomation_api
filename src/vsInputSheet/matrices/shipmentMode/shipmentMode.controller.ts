import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShipmentModeEntity } from './shipmentMode.entity';
import { ShipmentModeService } from './shipmentMode.service';

@Controller('')
export class ShipmentModeController {
  constructor(private service: ShipmentModeService) {}

  @Get('/getAll')
  async getAllModes(): Promise<ShipmentModeEntity[]> {
    return await this.service.getAll();
  }

  @Post('/getOne')
  async getOneMode(@Body() data: { id: number }): Promise<ShipmentModeEntity> {
    return await this.service.getOne(data);
  }

  @Post('/getBySupplier')
  async getModeBySupplier(
    @Body() data: { code: string },
  ): Promise<ShipmentModeEntity> {
    return await this.service.getBySupplier(data);
  }

  @Post('/add')
  async addMode(
    @Body() data: { mode: string; supplier: any },
  ): Promise<ShipmentModeEntity> {
    return await this.service.add(data);
  }

  @Post('/edit')
  async editMode(
    @Body() data: { id: number; mode: string; supplier: any },
  ): Promise<ShipmentModeEntity> {
    return await this.service.edit(data);
  }

  @Post('/delete')
  async deleteMode(@Body() data: { id: number }) {
    return await this.service.delete(data);
  }
}
