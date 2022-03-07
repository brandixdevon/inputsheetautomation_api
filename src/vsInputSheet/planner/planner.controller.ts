import { PlannerService } from './planner.service';
import { Controller, Get, Post, UsePipes, HttpCode, Body, Param } from '@nestjs/common';
import { ValidationPipe } from '../../_shared/validation.pipe'
import { PlannerDto } from './planner.dto';


@Controller('')
export class PlannerController {
    constructor(private plannerService:PlannerService){}
    @Get('/:buyer')
    getAllComponents(@Param('buyer') buyer:string){
        return this.plannerService.getAllPlanners(buyer);
    }

    @Get('/details/:id')
    getDetails(@Param('id') id:string){
        return this.plannerService.getDetails(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    createComponent(@Body() data:PlannerDto){
        return this.plannerService.createPlanner(data);
    }
}
