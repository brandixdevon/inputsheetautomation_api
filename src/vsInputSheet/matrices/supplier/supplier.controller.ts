import { Body, Controller, Get, Post } from '@nestjs/common';
import { SupplierEntity } from './supplier.entity';
import { SupplierService } from './supplier.service';

@Controller('')
export class SupplierController {
  constructor(private service: SupplierService) {}

  @Get('/getAll')
  async getAllSuppliers(): Promise<SupplierEntity[]> {
    return await this.service.getAll();
  }

  @Post('/getOne')
  async getOneSupplier(
    @Body() data: { code: string },
  ): Promise<SupplierEntity> {
    return await this.service.getOne(data);
  }

  @Post('/add')
  async addSupplier(
    @Body() data: { code: string; name: string },
  ): Promise<SupplierEntity> {
    return await this.service.add(data);
  }

  @Post('/edit')
  async editSupplier(
    @Body() data: { code: string; name: string },
  ): Promise<SupplierEntity> {
    return await this.service.edit(data);
  }

  @Post('/delete')
  async deleteSupplier(@Body() data: { code: string }) {
    return await this.service.delete(data);
  }
}
