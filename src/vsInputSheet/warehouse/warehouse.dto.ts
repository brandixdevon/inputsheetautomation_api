import {  IsNotEmpty } from "class-validator";

export class WarehouseDto{
    @IsNotEmpty()
    name:string;
}