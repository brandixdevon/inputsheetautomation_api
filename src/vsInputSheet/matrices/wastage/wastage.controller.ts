import { Body, Controller, Get, Post } from '@nestjs/common';
import { WastageEntity } from './wastage.entity';
import { WastageService } from './wastage.service';

@Controller('')
export class WastageController {
  constructor(private service: WastageService) {}

  @Get('/getAll')
  async getAllMerchs(): Promise<WastageEntity[]> {
    return await this.service.getAll();
  }

  @Post('/getOne')
  async getOneMerch(@Body() data: { id: number }): Promise<WastageEntity> {
    return await this.service.getOne(data);
  }

  @Post('/getByProdCode')
  async getMerchByProdCode(
    @Body() data: { code: string },
  ): Promise<WastageEntity> {
    return await this.service.getByProdCode(data);
  }

  @Post('/add')
  async addMerch(
    @Body()
    data: {
      wastage: string;
      productGroupCode: string;
      productGroupDesc: string;
    },
  ): Promise<WastageEntity> {
    return await this.service.add(data);
  }

  @Post('/edit')
  async editMerch(
    @Body()
    data: {
      id: number;
      wastage: string;
      productGroupCode: string;
      productGroupDesc: string;
    },
  ): Promise<WastageEntity> {
    return await this.service.edit(data);
  }

  @Post('/delete')
  async deleteMerch(@Body() data: { id: number }) {
    return await this.service.delete(data);
  }
}
