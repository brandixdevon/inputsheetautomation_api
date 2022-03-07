import { Controller, Get, Post, UsePipes, HttpCode, Body, Param } from '@nestjs/common';
import { ValidationPipe } from '../../_shared/validation.pipe'
import { PackmethodService } from './packmethod.service';
import { PackmethodDto } from './packmethod.dto';


@Controller('')
export class PackmethodController {
    constructor(private service:PackmethodService){}
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
    createComponent(@Body() data:PackmethodDto){
        return this.service.create(data);
    }
}
