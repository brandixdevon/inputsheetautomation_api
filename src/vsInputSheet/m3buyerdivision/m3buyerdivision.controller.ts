import { M3buyerdivisionDto } from './m3buyerdivision.dto';
import { M3buyerdivisionService } from './m3buyerdivision.service';

import { Controller, Get, Post, UsePipes, HttpCode, Body, Param } from '@nestjs/common';
import { ValidationPipe } from '../../_shared/validation.pipe'


@Controller('')
export class M3buyerdivisionController {
    constructor(private service:M3buyerdivisionService){}

    @Get('/:buyer')
    getAllComponents(@Param('buyer') buyer:string){
        return this.service.getAll(buyer);
    }

    @Get('/details/:id')
    getDetails(@Param('id') id:string){
        return this.service.getDetail(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    createComponent(@Body() data:M3buyerdivisionDto){
        return this.service.create(data);
    }
}
