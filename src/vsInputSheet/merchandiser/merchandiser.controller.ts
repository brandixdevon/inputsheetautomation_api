import { MerchandiserDto } from './merchandiser.dto';
import {  MerchandiserService } from './merchandiser.service';
import { Controller, Get, Post, UsePipes, HttpCode, Body, Param } from '@nestjs/common';
import { ValidationPipe } from '../../_shared/validation.pipe'


@Controller('')
export class MerchandiserController {
    constructor(private merchandiserService:MerchandiserService){}
    @Get('/:buyer')
    getAllComponents(@Param('buyer') buyer:string){
        return this.merchandiserService.getAllMerchandisers(buyer);
    }

    @Get('/details/:id')
    getDetails(@Param('id') id:string){
        return this.merchandiserService.getDetails(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    createComponent(@Body() data:MerchandiserDto){
        return this.merchandiserService.createMerchandiser(data);
    }
}
