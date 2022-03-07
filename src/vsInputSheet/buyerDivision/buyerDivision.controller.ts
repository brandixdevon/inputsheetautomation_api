import { BuyerdivisionDto } from './buyerDivision.dto';
import { BuyerdivisionService } from './buyerDivision.service';

import { Controller, Get, Post, UsePipes, HttpCode, Body, Param } from '@nestjs/common';
import { ValidationPipe } from '../../_shared/validation.pipe'


@Controller('')
export class BuyerdivisionController {
    constructor(private service:BuyerdivisionService){}

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
    createComponent(@Body() data:BuyerdivisionDto){
        return this.service.create(data);
    }
}
