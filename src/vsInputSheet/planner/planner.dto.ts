import {  IsNotEmpty } from "class-validator";

export class PlannerDto{
    @IsNotEmpty()
    name:string;
}