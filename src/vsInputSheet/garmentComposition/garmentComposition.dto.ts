import {  IsNotEmpty } from "class-validator";

export class GarmentCompositionDto{
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    buyer:string;
}