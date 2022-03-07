import { LeadfactoryService } from './leadfactory.service';
import { LeadfactoryDto } from './leadfactory.dto';

import { Controller, Get, Post, UsePipes, HttpCode, Body, Param } from '@nestjs/common';
import { ValidationPipe } from '../../_shared/validation.pipe'


@Controller('')
export class LeadfactoryController {
    constructor(private service:LeadfactoryService){}
    @Get()
    getAllComponents(){
        return this.service.getAll();
    }

    @Get('/details/:id')
    getDetails(@Param('id') id:string){
        return this.service.getDetails(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    createComponent(@Body() data:LeadfactoryDto){
        return this.service.create(data);
    }
}
