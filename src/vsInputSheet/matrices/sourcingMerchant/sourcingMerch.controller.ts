import { Body, Controller, Get, Post } from '@nestjs/common';
import { SourcingMerchEntity } from './sourcingMerch.entity';
import { SourcingMercService } from './sourcingMerch.service';

@Controller('')
export class SourcingMerchController {
  constructor(private service: SourcingMercService) {}

  @Get('/getAll')
  async getAllMerchs(): Promise<SourcingMerchEntity[]> {
    return await this.service.getAll();
  }

  @Post('/getOne')
  async getOneMerch(
    @Body() data: { id: number },
  ): Promise<SourcingMerchEntity> {
    return await this.service.getOne(data);
  }

  @Post('/getByProdCode')
  async getMerchByProdCode(
    @Body() data: { code: string },
  ): Promise<SourcingMerchEntity> {
    return await this.service.getByProdCode(data);
  }

  @Post('/add')
  async addMerch(
    @Body()
    data: {
      merchant: string;
      productGroupCode: string;
      productGroupDesc: string;
    },
  ): Promise<SourcingMerchEntity> {
    return await this.service.add(data);
  }

  @Post('/edit')
  async editMerch(
    @Body()
    data: {
      id: number;
      merchant: string;
      productGroupCode: string;
      productGroupDesc: string;
    },
  ): Promise<SourcingMerchEntity> {
    return await this.service.edit(data);
  }

  @Post('/delete')
  async deleteMerch(@Body() data: { id: number }) {
    return await this.service.delete(data);
  }
}
