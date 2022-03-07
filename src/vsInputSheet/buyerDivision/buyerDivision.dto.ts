import {  IsNotEmpty } from "class-validator";

export class BuyerdivisionDto{
    @IsNotEmpty()
    name:string;
}