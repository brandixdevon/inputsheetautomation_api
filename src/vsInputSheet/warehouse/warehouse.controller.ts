import { WarehouseDto } from './warehouse.dto';
import { WarehouseService } from './warehouse.service';

import { Controller, Get, Post, UsePipes, HttpCode, Body, Param } from '@nestjs/common';
import { ValidationPipe } from '../../_shared/validation.pipe'


@Controller('')
export class WarehouseController {
    constructor(private service:WarehouseService){}
    @Get('/:buyer')
    getAllComponents(@Param('buyer') buyer:string){
        return this.service.getAll(buyer);
    }

    @Get('/details/:id')
    getDetails(@Param('id') id:string){
        return this.service.getDetails(id);
    }
    
    @Post()
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    createComponent(@Body() data:WarehouseDto){
        return this.service.create(data);
    }
}
