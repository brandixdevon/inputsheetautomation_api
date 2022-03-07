import { Controller, Get, Post, UsePipes, HttpCode, Body, Param } from '@nestjs/common';
import { ValidationPipe } from '../../_shared/validation.pipe'
import { GarmentCompositionService } from './garmentComposition.service';
import { GarmentCompositionDto } from './garmentComposition.dto';


@Controller('')
export class GarmentCompositionController {
    constructor(private service:GarmentCompositionService){}
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
    createComponent(@Body() data:GarmentCompositionDto){
        return this.service.create(data);
    }
}
